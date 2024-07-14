import { useContext } from "react";
import { GameContext } from "../game";


export default function NavBar() {
    const {ntask, day} = useContext(GameContext);

    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-5 justify-start">
                <span className="hover:underline">Main Map</span>
                <span className="hover:underline">Character</span>
                <span className="hover:underline">Inventory</span>
                <span className="hover:underline">Quests</span>
            </div>
            <div className="flex flex-row gap-5 justify-end">
                <span>Tasks: {ntask}</span>
                <span>Day: {day}</span>
            </div>
        </div>
    )
}
