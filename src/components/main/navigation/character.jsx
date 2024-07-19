import { useContext } from "react";
import { GameContext } from "../../../game";
import Button from "../../elements/button";
import { produce } from "immer";
import { Weapons } from "../../../equipables/weapons";
import { Equipment } from "../../../equipables/equipment";

export default function Character() {

    const {character, setCharacter, charCondition, setCharCondition, inventory, setInventory} = useContext(GameContext);

    return(
        <div className="flex flex-col gap-4">
            <div className="flex flex-col justify-start items-start gap-2">
                <div>
                    <span>Class: </span>
                    <span>{character.class}</span>
                </div>
                <div>
                    <span>Level: </span>
                    <span>{character.level}</span>
                </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-2">
                <span className="font-semibold">Condition</span>
                <div>
                    <span>HP: </span>
                    <span>{charCondition.hp}/{character.stats.hp + charCondition.statEffects.hp}</span>
                </div>
                <div>
                    <span>Spiritual HP: </span>
                    <span>{charCondition.spiritualHp}/{character.stats.spiritualHp}</span>
                </div>
            </div>            
            <div className="flex flex-col justify-center items-start gap-2">
                <span className="font-semibold">Equipment</span>
                <div className="flex flex-row justify-between items-center gap-3">
                    <span>Weapon</span>
                    <span>{Weapons[charCondition.weapon]?.name}</span>
                    {charCondition.weapon ? 
                        <Button onClick={()=>{removeItem("weapon", charCondition.weapon, setInventory, setCharCondition)}}>Remove</Button>
                    : null}

                </div>
                <div className="flex flex-row justify-between items-center gap-3">
                    <span>Head </span>
                    <span>{Equipment[charCondition.equipment.head]?.name}</span>
                    {charCondition.equipment.head ?
                        <Button onClick={()=>{removeItem("equipment", charCondition.equipment.head, setInventory, setCharCondition)}}>Remove</Button>
                    : null}
                </div>
                <div className="flex flex-row justify-between items-center gap-3">
                    <span>Body: </span>
                    <span>{Equipment[charCondition.equipment.body]?.name}</span>
                    {charCondition.equipment.body ?
                        <Button onClick={()=>{removeItem("equipment", charCondition.equipment.body, setInventory, setCharCondition)}}>Remove</Button>
                    : null}        
                </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-2">
                <span className="font-semibold">Stats</span>
                <div>
                    <span>Physical HP: </span>
                    <span>{character.stats.hp + charCondition.statEffects.hp}</span>
                </div>
                <div>
                    <span>Strength: </span>
                    <span>{character.stats.strength + charCondition.statEffects.strength}</span>
                </div>
                <div>
                    <span>Defense: </span>
                    <span>{character.stats.defense + charCondition.statEffects.defense}</span>
                </div>
                <div>
                    <span>Spiritual HP: </span>
                    <span>{character.stats.spiritualHp + charCondition.statEffects.hp}</span>
                </div>
                <div>
                    <span>Zeal: </span>
                    <span>{character.stats.zeal + charCondition.statEffects.zeal}</span>
                </div>
                <div>
                    <span>Resilience:</span>
                    <span>{character.stats.resilience + charCondition.statEffects.resilience}</span>
                </div>
            </div>
        </div>
    )
}


function removeItem(type, item, setInventory, setCharCondition) {

    const itemObj = Equipment[item];

    setInventory(produce((inventory)=>{
        if (type === "weapon") {
            inventory.weapons.push(item);
        } else {
            inventory.equipment.push(item);
        }
    }));

    setCharCondition(produce((charCondition)=>{

        if (type === "weapon") {
            charCondition.weapon = null;
        } else {
            charCondition.equipment[itemObj.type] = null;
        }

        for (let effect of itemObj.effects) {
            charCondition.statEffects[effect.stat] = charCondition.statEffects[effect.stat] - effect.effect;
        }   
    }));

}