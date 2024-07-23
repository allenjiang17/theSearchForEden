import Button from "../../elements/button";
import { useContext, useEffect, useRef, useState } from "react";
import { GameContext } from "../../../game";
import { produce } from "immer";
import { QuestsDict } from "../../../locations/quests";
import DialogueBox from "../../elements/dialoguebox";
import { Fragment } from "react";
import { TOTAL_TASKS_PER_DAY } from "../../../utils/constants";
import LoadingBar from "../../elements/loading";

export default function NightRestEvent() {


    const [state, setState] = useState("start");

    const gameState = useContext(GameContext);

    const description = `Would you like to go to sleep for the night? You'll restore your physical 
                         health and start a brand new day.`;

    function restoreHealth() {

        setState("inProgress");

        gameState.setCharCondition(produce((newCharCondition)=>{
            newCharCondition.hp = 100;
        }));

        gameState.taskFunc.sleep();

        gameState.setDay(gameState.day + 1);
    }
    
    return (
        <div className="w-full p-8 border-2 flex flex-col justify-start items-center gap-3">
            <span>{description}</span>
            {state === "start" ?             
            <div className="flex flex-row justify-center items-center gap-3">
                <Button onClick={restoreHealth}>Sleep</Button>
            </div> : null}
            {state === "inProgress" ?
                <LoadingBar duration={5000} callBack={()=>setState("finished")}/> 
            : null}
            {state === "finished" ? 
                <span>You wake up feeling refreshed</span>
            : null}
        </div>
    )
}
