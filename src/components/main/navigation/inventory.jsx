import { useContext } from "react";
import { GameContext } from "../../../game";
import { AreaOneItems } from "../../../locations/areaOne/items";

export default function Inventory() {

    const {inventory, setInventory} = useContext(GameContext);
    console.log(inventory);
    const items = Object.keys(inventory.items).map((item)=>{
        return <div>{AreaOneItems[item].name + " x" + inventory.items[item]}</div>
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
        </div>
    )
}