import { useContext } from "react";
import { GameContext } from "../../../game";

export default function Inventory() {

    const {inventory, setInventory} = useContext(GameContext);

    return(
        <div className="flex flex-col gap-4">
            <span>Inventory</span>
            <div>
                <span>Coins: </span>
                <span>{inventory.money}</span>
            </div>
        </div>
    )
}