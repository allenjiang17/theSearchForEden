import Button from "../../elements/button";
import { useContext, useEffect, useRef, useState } from "react";
import { GameContext } from "../../../game";
import { produce } from "immer";
import { QuestsDict } from "../../../locations/quests";
import DialogueBox from "../../elements/dialoguebox";
import { Fragment } from "react";

export default function GenericEvent({event, setCurrentEvent}) {

    const [displayTextDone, setDisplayTextDone] = useState(false);

    const gameState = useContext(GameContext);
    const loaded = useRef(false);

    const title = event.title;
    const description = event.description;
    const actions = event.actions;

    useEffect(()=>{
        //load auto action upon component mount
        if (event.autoAction && !loaded.current) {
            event.autoAction.func(gameState, event, setCurrentEvent);
            gameState.taskFunc.use();
        }

        //if event has a quest trigger
        if (event.quests && !loaded.current) {
            for (let quest of event.quests) {
                if (quest.action === "start" && !gameState.quests[quest.id]) {
                    gameState.setQuests(produce((newQuests)=>{newQuests[quest.id] = {progress: "started"}}));
                } else if (quest.action === "complete") {
                    gameState.setQuests(produce((newQuests)=>{newQuests["getSomeClothes"] = {progress: "complete"}}));
                }
            }
        }

        loaded.current = true
    },[]);

    const questTexts = event.quests ? event.quests.map((quest)=>(
        <span className="font-semibold" key={quest.id}>
            Quest: {QuestsDict[quest.id].title} {quest.action === "start" ? "started" : quest.action === "complete" ? "completed" : null}
        </span>
    )) : null

    const buttons = actions.map((action)=>(
        <Button onClick={()=>{
            action.func(gameState, event, setCurrentEvent);
            gameState.taskFunc.use();
        }} key={action.name}>
            {action.name}
        </Button>
    ));
    
    return (
        <div className="w-full p-8 border-2 flex flex-col justify-start items-center gap-3">
            <DialogueBox text={description} callBack={()=>{setDisplayTextDone(true)}}/>
            {
                displayTextDone ?
                <Fragment>
                    {questTexts}
                    <div className="flex flex-row justify-center items-center gap-3">
                        {buttons}
                    </div>
                </Fragment> :
                null
            }
        </div>
    )
}
