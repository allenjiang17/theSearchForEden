import { useContext } from "react";
import { GameContext } from "../game";
import TaskDisplay from './elements/taskDisplay'

export default function BottomBar() {
    const {ntask, day} = useContext(GameContext);

    let bgColor; 
    if (ntask >= 12) {
        bgColor = "bg-gray-400";
    } else if (ntask >= 6 && ntask < 12) {
        bgColor = "bg-gray-500";
    } else {
        bgColor = "bg-black"
    }

    return (
        <div className={"fixed left-0 bottom-0 w-full p-3 flex md:hidden text-white flex-row gap-5 justify-center " + bgColor} >
            <span>Day {day}</span>
            <TaskDisplay/>
        </div>
    );
}