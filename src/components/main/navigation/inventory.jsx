import { useContext } from "react";
import { GameContext } from "../../../game";
import { AreaOneItems } from "../../../locations/areaOne/items";
import { Weapons } from "../../../equipables/weapons";
import { Equipment } from "../../../equipables/equipment";
import Button from "../../elements/button";
import { produce } from "immer";

export default function Inventory() {

    const {inventory, setInventory, charCondition, setCharCondition} = useContext(GameContext);
    console.log(inventory);
    const items = Object.keys(inventory.items).map((item)=>{
        return <div>{AreaOneItems[item].name + " x" + inventory.items[item]}</div>
    });

    const weapons = inventory.weapons.map((item, index)=>{
        return (
            <div key={`${item}${index}`} className="flex flex-row justify-between items-center gap-3">
                <span>{Weapons[item].name}</span>
                <Button onClick={()=>{
                    setInventory(produce((inventory)=>{inventory.weapons.splice(index, 1);
                    setCharCondition(produce((charCondition)=>{
                        charCondition.weapon = item;
                        }))
                    }))}
                }>Equip</Button>
            </div>
        )
    });

    const equipment = inventory.equipment.map((item, index)=>{
        const itemObj = Equipment[item];
        return (
            <div key={`${item}${index}`} className="flex flex-row justify-between items-center gap-3">
                <span>{itemObj.name}:</span>
                <Button onClick={(event)=>{
                    setInventory(produce((inventory)=>{inventory.equipment.splice(index, 1);}));
                    setCharCondition(produce((charCondition)=>{
                        charCondition.equipment[itemObj.type] = item;
                        for (let effect of itemObj.effects) {
                            charCondition.statEffects[effect.stat] = charCondition.statEffects[effect.stat] + effect.effect;
                        }
                        }));
                }}>Equip</Button>
            </div>
        )
    });

    console.log(items);
    return(
        <div className="flex flex-col gap-4">
            <span>Inventory</span>
            <div>
                <span>Coins: </span>
                <span>{inventory.money}</span>
            </div>
            <div>
                <span>Items</span>
                {items}
            </div>
            <div>
                <span>Weapons</span>
                {weapons}
            </div>
            <div>
                <span>Equipment</span>
                {equipment}
            </div>


        </div>
    )
}
