import Button from "../../elements/button";
import { useContext, useState } from "react";
import { GameContext } from "../../../game";
import { produce } from "immer";
import { AreaOneLocations } from "../../../locations/areaOne/locations";
import { AreaOneEnemies } from "../../../locations/areaOne/enemies";
import { AreaOneItems } from "../../../locations/areaOne/items";
import { Weapons } from "../../../equipables/weapons";



export default function CombatEvent() {

    const {location} = useContext(GameContext);
    const [enemy, setEnemy] = useState(getRandomEnemy(AreaOneLocations[location].enemies));
    return <Combat enemy={AreaOneEnemies[enemy]} />

}

export function Combat({enemy}) {

    const gameState = useContext(GameContext);

    const [enemyHp, setEnemyHp] = useState(enemy.hp);
    const [combatMessage, setCombatMessage] = useState("");
    const [combatStatus, setCombatStatus] = useState("ongoing"); //ongoing, won, lost

    function calculateCombatTurn() {

        const charAttack = enemy.type === "physical" ? gameState.character.stats.strength : gameState.character.stats.zeal;
        const charDefense = enemy.type === "physical" ? gameState.character.stats.defense: gameState.character.stats.resilience;
        const charWeapon = Weapons[gameState.character.weapon ?? "bareHands"];

        const damage = Math.ceil(charWeapon.power * (charAttack / enemy.defense) * (0.5*Math.random() + 0.75));
        const enemyDamage = Math.ceil((enemy.attack / charDefense) * 0.5*Math.random() + 0.75);

        setEnemyHp(Math.max(0, enemyHp - damage));
        gameState.setCharCondition(produce((charCondition)=>{
            
            charCondition.hp = Math.max(0, gameState.charCondition.hp - enemyDamage)

        }));
        setCombatMessage(`You dealt ${damage} damage. ${enemy.name} dealt ${enemyDamage} damage.`);

        if (enemyHp === 0) {
            setCombatStatus("won");
            winCombat();
        } else if (gameState.charCondition.hp === 0){
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
                gameState.setInventory(produce((inventory)=>{
                    inventory.items.set(itemDrop.item, (inventory.items.get(itemDrop.item) || 0) + 1);
                }))
                lootMessage.push(`${AreaOneItems[itemDrop.item].name}`);

            }
        }

        setCombatMessage(`You defeated ${enemy.name}! You gained ${joinList(statMessage)}, and you found ${joinList(lootMessage)}.`);

    }

    function loseCombat() {

        setCombatMessage(`Ouch. You were defeated by ${enemy.name}. Perhaps you should go home and take a nap.`);

    }
    
    const button = combatStatus === "ongoing" ? 
        <Button onClick={calculateCombatTurn}>Attack!</Button> :
        <Button onClick={()=>{gameState.setCurrentEvent(null); gameState.setLocation(AreaOneLocations[gameState.location].parent)}}>Go back to {AreaOneLocations[AreaOneLocations[gameState.location].parent].title}</Button>;
    
    return (
        <div className="p-8 border-2 flex flex-col justify-start items-center gap-3">
            <span>{enemy.name}</span>
            <span>Hp: {enemyHp}/{enemy.hp}</span>
            <span>{enemy.description}</span>
            <span>{combatMessage}</span>
            <span>Your Hp: {gameState.charCondition.hp}/{gameState.character.stats.hp}</span>
            <div className="flex flex-row justify-center items-center gap-3">
                {button}
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

function joinList(array) {
    if (array.length === 0) return 'nothing';
    if (array.length === 1) return array[0];
    if (array.length === 2) return array.join(' and ');
    return array.slice(0, -1).join(', ') + ', and ' + array[array.length - 1];
}