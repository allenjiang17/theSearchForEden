import { useContext } from "react";
import { GameContext } from "../game";



export default function NavBar({setPage}) {
    const {ntask, day} = useContext(GameContext);

    return (
        <div className="w-full flex flex-row justify-between">
            <div className="flex flex-row gap-5 justify-start">
                <button className="hover:underline" onClick={()=>{setPage("map")}}>Main Map</button>
                <button className="hover:underline" onClick={()=>{setPage("character")}}>Character</button>
                <button className="hover:underline" onClick={()=>{setPage("inventory")}}>Inventory</button>
                <button className="hover:underline" onClick={()=>{setPage("quests")}}>Quests</button>
            </div>
            <div className="flex flex-row gap-5 justify-end">
                <span>Tasks: {ntask}</span>
                <span>Day: {day}</span>
            </div>
        </div>
    )
}
