
import { useContext } from "react";
import { GameContext } from "../../../game";
import { QuestsDict } from "../../../locations/quests";

export default function Quests() {

    const {quests, setQuests} = useContext(GameContext);

    console.log(quests);

    const questDivs = Object.keys(quests).map((questName)=> {
        return <Quest key={questName} quest={QuestsDict[questName]} progress={quests[questName].progress}/>
    });

    return(
        <div className="w-full flex flex-col gap-4">
            <span className="font-semibold">Quests</span> 
            {questDivs}
        </div>
    )







}

function Quest({quest, progress}) {
    return( 
        <div className="w-full border-2 flex flex-col gap-2 p-3">
            <span className="font-semibold">{quest.title}</span>
            <span>{progress !== "complete" ? quest.description: null}</span>
            <span>{progress === "complete" ? "Complete" : "In Progress"}</span>
        </div>
    )
}