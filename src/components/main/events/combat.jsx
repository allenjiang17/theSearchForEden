import Button from "../../elements/button";
import { Fragment } from "react";
import { useContext, useState, useEffect } from "react";
import { GameContext } from "../../../game";
import { produce } from "immer";
import { AreaOneLocations } from "../../../locations/areaOne/locations";
import { AreaOneEnemies } from "../../../locations/areaOne/enemies";
import { AreaOneItems } from "../../../locations/areaOne/items";
import { Weapons } from "../../../equipables/weapons";
import { areStringsEqual, updateInventory } from "../../../utils/misc";
import { IncantationsDictionary } from "../../../locations/incantations";
import LoadingBar from "../../elements/loading";



export default function CombatEvent({event, setCurrentEvent}) {

    const {location} = useContext(GameContext);
    const [enemy, setEnemy] = useState(getRandomEnemy(AreaOneLocations[location].enemies));
    return <Combat enemy={AreaOneEnemies[enemy]} event={event} setCurrentEvent={setCurrentEvent} />

}

export function Combat({enemy, event, setCurrentEvent}) {

    console.log("render");

    const gameState = useContext(GameContext);

    const [enemyCondition, setEnemyCondition] = useState({
        hp: enemy.hp,
        affliction: null,
        buff: null
    });

    const [enemyTurn, setEnemyTurn] = useState(0);

    const [playerAction, setPlayerAction] = useState("");
    const [playerCombatMessage, setPlayerCombatMessage] = useState(" ");
    const [enemyCombatMessage, setEnemyCombatMessage] = useState(" ");
    const [combatStatus, setCombatStatus] = useState("ongoing"); //ongoing, won, lost

    const isPhysicalBattle = enemy.type === "physical";
    function calculatePlayerTurn() {

        if (playerAction.toLowerCase() === "attack") {

            calculateNormalAttack();

        } else if (playerAction.toLowerCase().includes("incantation")) {

            calculateIncantation(playerAction.split("incantation")[1].trim());
 
        } else {

            setPlayerCombatMessage("uhhh...were you trying to do something? Because that ain't it.")
        }

    }

    function calculateNormalAttack() {

        if (!isPhysicalBattle) {
            setPlayerCombatMessage(`You tried attacking with your ${gameState.charCondition.weapon ?? "bareHands"}. Unfortunately, your enemy is not a physical thing, so it did absolutely nothing. You need to rethink your strategy here.`); 

        }

        const charAttack = gameState.character.stats.strength;
        const charWeapon = Weapons[gameState.charCondition.weapon ?? "bareHands"];

        const damage = Math.ceil(charWeapon.power * (charAttack / enemy.defense) * (0.5*Math.random() + 0.75));
        const enemyHp = Math.max(0, enemyCondition.hp - damage);

        setEnemyCondition(produce((enemyCondition)=>{
            enemyCondition.hp = enemyHp;
            //other conditions could be set here
        })); 
        setPlayerCombatMessage(`You attacked using your ${gameState.charCondition.weapon ?? "bare hands"}. You dealt ${damage} damage`); 
        setPlayerAction("");

        if (enemyHp === 0) {
            setCombatStatus("won");
            winCombat();
        }

    }

    function calculateIncantation(incantation) {
        const charAttack = gameState.character.stats.zeal;
        const incantationMatch = matchIncantation(incantation, gameState.character.incantations);

        if (incantationMatch) {
            if (IncantationsDictionary[incantationMatch].type === "attack") {
                const {effectiveness, baseDamage}  = calculateBaseDamage(incantationMatch, enemy);
                const damage = Math.ceil(baseDamage * (charAttack / enemy.defense) * (0.5*Math.random() + 0.75));
                const enemyHp = Math.max(0, enemyCondition.hp - damage);

                setEnemyCondition(produce((enemyCondition)=>{
                    enemyCondition.hp = enemyHp;
                    //other conditions could be set here
                })); 

                if (effectiveness === "superEffective") {
                    setPlayerCombatMessage(`You spoke a powerful incantation. It dealt super effective damage! You dealt ${damage} damage`); 
                } else if (effectiveness === "normalEffective") {
                    setPlayerCombatMessage(`You spoke an incantation. It seemed to work! You dealt ${damage} damage`);
                } else {
                    setPlayerCombatMessage(`You spoke an incantation, but it seemed to have no effective on your enemy. You dealt ${damage} damage`);
                }
                
                if (enemyHp === 0) {
                    setCombatStatus("won");
                    winCombat();
                }
            }

            if (IncantationsDictionary[incantationMatch].type === "heal") {

                const healAmount = Math.ceil(IncantationsDictionary[incantationMatch].basePower * (0.5*Math.random() + 0.75));

                gameState.setCharCondition(produce((charCondition)=>{
                    charCondition.hp = charCondition.hp + healAmount;
                    charCondition.spiritualHp = charCondition.spiritualHp + healAmount;
                }));

                setPlayerCombatMessage(`You healed for ${healAmount}`);
            }

            if (IncantationsDictionary[incantationMatch].type === "buff") {

                IncantationsDictionary[incantationMatch].func(gameState);
                setPlayerCombatMessage(`${IncantationsDictionary[incantationMatch].message}`);

            }

        } else {
            setPlayerCombatMessage("You fumble around with your words and try to say something meaningful, but it doesn't seem to work.")
        }
        setPlayerAction("");

    }

    function calculateEnemyTurn() {
        console.log("here");
        const charDefense = isPhysicalBattle ? gameState.character.stats.defense : gameState.character.stats.resilience;

        //Calculate Enemy Damage and turn
        const enemyDamage = Math.ceil((enemy.attack / charDefense) * 0.5*Math.random() + 0.75);
        const charHp = isPhysicalBattle ? Math.max(0, gameState.charCondition.hp - enemyDamage) : gameState.charCondition.hp;
        const charSpiritualHp = isPhysicalBattle ? gameState.charCondition.spiritualHp : Math.max(0, gameState.charCondition.spiritualHp - enemyDamage);
    
        gameState.setCharCondition(produce((charCondition)=>{
            charCondition.hp = charHp
            charCondition.spiritualHp = charSpiritualHp;
        }));

        setEnemyCombatMessage(`${enemy.name} attacked! It dealt ${enemyDamage} damage.`);

        if (charHp === 0 || charSpiritualHp === 0) {
            setCombatStatus("lost");
            loseCombat();
        }

    }

    function EnemyAttackDisplay () {

        const duration = 3000; 
        const messageDisappearTime = 1000;
        const [progress, setProgress] = useState(0);
        const [showMessage, setShowMessage] = useState(true);
        const [completed, setCompleted] = useState(false);
      
        useEffect(() => {
            if (combatStatus !== "ongoing") {
              return;
            }

          // Set up interval to increment progres
          const increment = 100 / (duration / 100); // Calculate the increment value based on duration
          const interval = setInterval(() => {
            setProgress(prev => {
              if (prev >= 100) {
                clearInterval(interval);
                setCompleted(true);
                return 100;
              }

              if (prev >= (messageDisappearTime/duration) * 100 ) {
                setShowMessage(false);
              }
              return prev + increment;
            });
          }, 100);
      
          return () => clearInterval(interval); // Cleanup interval on component unmount
        }, [duration, completed]);
      
        useEffect(() => {
          if (completed) {
            console.log("completed");
            calculateEnemyTurn();
            setShowMessage(true);
            setCompleted(false); // Reset completion state for next loop
            setProgress(0); // Reset progress for next loop
          }
        }, [completed]);
      
        return (
            <div>
                <span className={`mt-4 transition-opacity duration-1000 ${showMessage? 'opacity-100' : 'opacity-0'}`}>
                    {enemyCombatMessage}
                </span>
            </div>
        );
      };

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

        setPlayerCombatMessage(`You defeated ${enemy.name}! You gained ${joinList(statMessage)}, and you found ${joinList(lootMessage)}.`);
        gameState.taskFunc.use();
    }

    function loseCombat() {

        setPlayerCombatMessage(`Ouch. You were defeated by ${enemy.name}. Perhaps you should go home and take a nap.`);
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
                <input className={playerAction.includes("incantation") ? "animate-pulse text-blue-500" : "text-black"}type="text" placeholder="What will you do?" value={playerAction} onChange={(event)=>{setPlayerAction(event.target.value)}} onKeyPress={(e)=>{console.log(e.key); if (e.key === "Enter") {console.log("enter");calculatePlayerTurn()}}}/>
                <Button onClick={calculatePlayerTurn}>Submit</Button>
            </div>            
            <BattleItemComponent 
                gameState={gameState} 
                enemyCondition={enemyCondition} 
                setEnemyCondition={setEnemyCondition} 
                setCombatStatus={setCombatStatus} 
                setCombatMessage={setPlayerCombatMessage} 
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
            <EnemyAttackDisplay/>
            <span>{playerCombatMessage}</span>
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


function calculateBaseDamage(incantationKey, enemy) {

    const superEffectiveWeight = 2;
    const normalEffectiveWeight = 1;

    //see if incantation is in enemy's dictionary
    for (let key of enemy.incantations.superEffective) {
        console.log(key);
        if (incantationKey === key) {
            return {
                effectiveness: "superEffective",
                baseDamage: superEffectiveWeight * IncantationsDictionary[key].basePower
            }
        }
    }

    for (let key of enemy.incantations.normalEffective) {
        if (incantationKey === key) {
            return {
                effectiveness: "normalEffective",
                baseDamage: normalEffectiveWeight * IncantationsDictionary[key].basePower
            }        
        }
    }

    return {
        effectiveness: none,
        baseDamage: 0
    }   

}

function matchIncantation(inputIncantation, charIncantation) {
    let match = null;
    for (let key of charIncantation) {
        if (areStringsEqual(inputIncantation, IncantationsDictionary[key]?.incantation)) {
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

