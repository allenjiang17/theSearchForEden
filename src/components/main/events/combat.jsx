import Button from "../../elements/button";
import { Fragment } from "react";
import { useContext, useState } from "react";
import { GameContext } from "../../../game";
import { produce } from "immer";
import { AreaOneLocations } from "../../../locations/areaOne/locations";
import { AreaOneEnemies } from "../../../locations/areaOne/enemies";
import { AreaOneItems } from "../../../locations/areaOne/items";
import { Weapons } from "../../../equipables/weapons";
import { areStringsEqual, updateInventory } from "../../../utils/misc";
import { LogosDictionary } from "../../../locations/logos";



export default function CombatEvent({event, setCurrentEvent}) {

    const {location} = useContext(GameContext);
    const [enemy, setEnemy] = useState(getRandomEnemy(AreaOneLocations[location].enemies));
    return <Combat enemy={AreaOneEnemies[enemy]} event={event} setCurrentEvent={setCurrentEvent} />

}

export function Combat({enemy, event, setCurrentEvent}) {

    console.log('render');

    const gameState = useContext(GameContext);

    const [enemyCondition, setEnemyCondition] = useState({
        hp: enemy.hp,
        affliction: null,
        buff: null
    });

    const [logos, setLogos] = useState("");
    const [combatMessage, setCombatMessage] = useState("");
    const [combatStatus, setCombatStatus] = useState("ongoing"); //ongoing, won, lost

    const isPhysicalBattle = enemy.type === "physical";

    function calculateCombatTurn() {

        const charAttack = isPhysicalBattle ? gameState.character.stats.strength : gameState.character.stats.zeal;
        const charDefense = isPhysicalBattle ? gameState.character.stats.defense : gameState.character.stats.resilience;

        const logosMatch = matchLogos(logos, gameState.character.logos);

        let combatMessage = "You mumble around and try to say something significant -- but nothing happens.";

        if (logosMatch) {
            if (LogosDictionary[logosMatch].type === "attack") {
                const baseDamage = calculateBaseDamage(logosMatch, enemy);
                const damage = Math.ceil(baseDamage * (charAttack / enemy.defense) * (0.5*Math.random() + 0.75));
                const enemyHp = Math.max(0, enemyCondition.hp - damage);

                setEnemyCondition(produce((enemyCondition)=>{
                    enemyCondition.hp = enemyHp;
                    //other conditions could be set here
                })); 
                combatMessage = `You dealt ${damage} damage`; 
                
                if (enemyHp === 0) {
                    setCombatStatus("won");
                    winCombat();
                }
            }

            if (LogosDictionary[logosMatch].type === "heal") {

                const healAmount = Math.ceil(LogosDictionary[logosMatch].basePower * (0.5*Math.random() + 0.75));

                gameState.setCharCondition(produce((charCondition)=>{
                    charCondition.hp = charCondition.hp + healAmount;
                    charCondition.spiritualHp = charCondition.spiritualHp + healAmount;
                }));

                combatMessage = `You healed for ${healAmount}`;
            }

            if (LogosDictionary[logosMatch].type === "buff") {

                LogosDictionary[logosMatch].func(gameState);
                combatMessage = `${LogosDictionary[logosMatch].message}`;

            }

        }
        setLogos("");

        //Calculate Enemy Damage and turn
        const enemyDamage = Math.ceil((enemy.attack / charDefense) * 0.5*Math.random() + 0.75);
        const charHp = isPhysicalBattle ? Math.max(0, gameState.charCondition.hp - enemyDamage) : gameState.charCondition.hp;
        const charSpiritualHp = isPhysicalBattle ? gameState.charCondition.spiritualHp : Math.max(0, gameState.charCondition.spiritualHp - enemyDamage);
 
        gameState.setCharCondition(produce((charCondition)=>{
            charCondition.hp = charHp
            charCondition.spiritualHp = charSpiritualHp;
        }));

        setCombatMessage(`${combatMessage}. ${enemy.name} dealt ${enemyDamage} damage.`);

        if (charHp === 0 || charSpiritualHp === 0) {
            setCombatStatus("lost");
            loseCombat();
        }
    }

    function winCombat() {

        let statMessage = [];
        let lootMessage = [];

        //add xp
        for (let statReward of enemy.statReward) {

            const statGain = (Math.random()<=statReward.chance) ? statReward.amount : 0;
            gameState.setCharacter(produce((character)=>{
                character.stats[statReward.stat] = Math.max(0, gameState.character.stats[statReward.stat] + statGain);
            }))
            if (statGain > 0) {
                statMessage.push(`+${statGain} ${statReward.stat}`);
            }
        }

        //get loot
        for (let itemDrop of enemy.itemDrop) {

            if (Math.random()<=itemDrop.chance) {
                gameState.setInventory(produce((newInventory)=>{
                    updateInventory(newInventory, itemDrop.item);
                }))
                lootMessage.push(`${AreaOneItems[itemDrop.item].name}`);

            }
        }

        setCombatMessage(`You defeated ${enemy.name}! You gained ${joinList(statMessage)}, and you found ${joinList(lootMessage)}.`);
        gameState.taskFunc.use();
    }

    function loseCombat() {

        setCombatMessage(`Ouch. You were defeated by ${enemy.name}. Perhaps you should go home and take a nap.`);
        gameState.taskFunc.use();

    }

    function BattleItemComponent() {

        const [itemUsed, setItemUsed] = useState("");
    
        function useItem() {
    
            if(!itemUsed) {
                console.log('no item selected')
                return
            }

            const item = AreaOneItems[itemUsed];
                
            //calculate enemy damage
            const charDefense = isPhysicalBattle ? gameState.character.stats.defense : gameState.character.stats.resilience;
            const enemyDamage = Math.ceil((enemy.attack / charDefense) * 0.5*Math.random() + 0.75);
    
            gameState.setCharCondition(produce((charCondition)=>{
                isPhysicalBattle ? 
                    charCondition.hp = Math.max(0, gameState.charCondition.hp - enemyDamage) 
                    : charCondition.spiritualHp = Math.max(0, gameState.charCondition.spiritualHp - enemyDamage);
            }));
    
            //calculate item effect
            if (item.battleAction.type === "heal") {
                gameState.setCharCondition(produce((charCondition)=>{
                    charCondition.hp = charCondition.hp + item.battleAction.amount
                }));
            }
    
            if (item.battleAction.type === "damage") {
                setEnemyCondition(produce((enemyCondition)=>{
                    enemyCondition.hp = enemyCondition.hp - item.battleAction.amount
                }));
            }
    
                //implement for damage, status effects, etc.

            //use up item
            gameState.setInventory(produce((newInventory)=>{
                newInventory.items[itemUsed] = Math.max(0, newInventory.items[itemUsed] - 1);
                if (newInventory.items[itemUsed] === 0) {
                    delete newInventory.items[itemUsed];
                }
            }))
            setCombatMessage(`${item.battleAction.description}. ${enemy.name} dealt ${enemyDamage} damage.`);

            if (enemyCondition.hp === 0) {
                setCombatStatus("won");
                winCombat();
            } else if (gameState.charCondition.hp === 0 || gameState.charCondition.spiritualHp === 0) {
                setCombatStatus("lost");
                loseCombat();
            }
    
        }
    
        const battleItems = Object.keys(gameState.inventory.items).map((itemId)=>{
    
            const item = AreaOneItems[itemId];
            if (item.battleItem) {
                return <option value={itemId}>{item.name}</option>
            }
        });
    
        return (
            <div>
                <div>
                    Item: 
                    <select value={itemUsed} onChange={(event)=>{setItemUsed(event.target.value)}}>
                        <option value={null}>Select</option>
                        {battleItems}
                    </select> 
                    <Button onClick={useItem}>Use</Button>
                </div>
            </div>
        )
    }

    const buttonActions = 
        <Fragment>
            <div className="w-full flex flex-row justify-center items-center gap-2">
                <input type="text" placeholder="Type your logos here" value={logos} onChange={(event)=>{setLogos(event.target.value)}}/>
                <Button onClick={calculateCombatTurn}>Speak</Button>
            </div>            
            <BattleItemComponent 
                gameState={gameState} 
                enemyCondition={enemyCondition} 
                setEnemyCondition={setEnemyCondition} 
                setCombatStatus={setCombatStatus} 
                setCombatMessage={setCombatMessage} 
                isPhysicalBattle={isPhysicalBattle}
                winCombat={winCombat} 
                loseCombat={loseCombat}
            />
        </Fragment>
    const buttonLeave = <Button onClick={()=>{setCurrentEvent(null); gameState.setLocation(AreaOneLocations[gameState.location].parent)}}>Go back to {AreaOneLocations[AreaOneLocations[gameState.location].parent].title}</Button>;
    
    return (
        <div className="p-8 border-2 flex flex-col justify-start items-center gap-3">
            <span>{enemy.name}</span>
            <span>Hp: {enemyCondition.hp}/{enemy.hp}</span>
            <span>{enemy.description}</span>
            <span>{combatMessage}</span>
            {isPhysicalBattle ? 
                <span>Your Hp: {gameState.charCondition.hp}/{gameState.character.stats.hp}</span>
            : 
                <span>Your Spiritual Hp: {gameState.charCondition.spiritualHp}/{gameState.character.stats.spiritualHp}</span>
            }          
            <div className="flex flex-col justify-center items-center gap-3">
               {combatStatus === "ongoing" ? buttonActions : null}
               {combatStatus === "won" || combatStatus === "lost" ? buttonLeave : null}
            </div>
        </div>
    )



}

function getRandomEnemy(enemies) {

    if (!enemies) {
        return null;
    }

    let probSum = 0;

    for (let enemy of enemies) {
        probSum += AreaOneEnemies[enemy].encounterRate;
    }

    let seed = probSum * Math.random();

    for (let enemy of enemies) {
        seed -= AreaOneEnemies[enemy].encounterRate;
        if (seed <= 0) {
            return enemy;
        }
    }
}


function calculateBaseDamage(logosKey, enemy) {

    const superEffectiveWeight = 2;
    const normalEffectiveWeight = 1;

    //see if logos is in enemy's dictionary
    for (let key of enemy.logos.superEffective) {
        if (logosKey === key) {
            return superEffectiveWeight * LogosDictionary[key].basePower
        }
    }

    for (let key of enemy.logos.normalEffective) {
        if (logosKey === key) {
            return normalEffectiveWeight * LogosDictionary[key].basePower
        }
    }

    return 0;

}

function matchLogos(inputLogos, charLogos) {
    let match = null;
    for (let key of charLogos) {
        if (areStringsEqual(inputLogos, LogosDictionary[key]?.logos)) {
            match = key;
        }
    }
    return match;

}

function joinList(array) {
    if (array.length === 0) return 'nothing';
    if (array.length === 1) return array[0];
    if (array.length === 2) return array.join(' and ');
    return array.slice(0, -1).join(', ') + ', and ' + array[array.length - 1];
}
