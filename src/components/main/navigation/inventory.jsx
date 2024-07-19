import { useContext, useState } from "react";
import { GameContext } from "../../../game";
import { AreaOneItems } from "../../../locations/areaOne/items";
import { Weapons } from "../../../equipables/weapons";
import { Equipment } from "../../../equipables/equipment";
import Button from "../../elements/button";
import { produce } from "immer";


export default function Inventory() {

    const {inventory, setInventory, charCondition, setCharCondition} = useContext(GameContext);

    const [currentItem, setCurrentItem] = useState(null);
    console.log(currentItem);

    const items = Object.keys(inventory.items).map((item)=>{
        if (inventory.items[item] !== 0 ) {
            return (
                <div>
                    <button onClick={()=>{setCurrentItem(AreaOneItems[item])}}>{AreaOneItems[item].name + " x" + inventory.items[item]}</button>
                </div>
            );
        }
    });

    const weapons = inventory.weapons.map((item, index)=>{
        return (
            <div key={`${item}${index}`} className="flex flex-row justify-start items-center gap-3">
                <button onClick={()=>{setCurrentItem(Weapons[item])}}>{Weapons[item].name}</button>
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
            <div key={`${item}${index}`} className="flex flex-row justify-start items-center gap-3">
                <button onClick={()=>{setCurrentItem(itemObj)}}>{itemObj.name}:</button>
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
        <div className="w-full flex flex-row justify-between items-start gap-3">
            <div className="w-full flex flex-col gap-4">
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
            {currentItem ? <ItemBox item={currentItem} setCurrentItem={setCurrentItem}/> : null}
        </div>
    )
}


function ItemBox({item, setCurrentItem}) {
    return( 
        <div className="w-3/4 border-2 flex flex-col gap-2 p-3">
            <span>{item.name}</span>
            <span>{item.description}</span>
            <span>Sell Price: {item.price}</span>
            <br/>
            {item.effects ? 
                <span>{item.effects.map((effect)=>{return effect.stat + ":" + effect.effect})}</span>
            :null}
            <Button onClick={()=>{setCurrentItem(null)}}>Close</Button>
        </div>
    )
}
