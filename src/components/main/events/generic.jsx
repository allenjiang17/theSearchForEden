import Button from "../../elements/button";
import { useContext, useEffect, useRef } from "react";
import { GameContext } from "../../../game";


export default function GenericEvent({event, setCurrentEvent}) {
    const gameState = useContext(GameContext);
    const loaded = useRef(false);

    const title = event.title;
    const description = event.description;
    const actions = event.actions;

    useEffect(()=>{
        //load auto action upon component mount
        if (event.autoAction && !loaded.current) {
            event.autoAction.func(gameState, event, setCurrentEvent);
        }

        loaded.current = true
    },[])

    const buttons = actions.map((action)=>(
        <Button onClick={()=>{
            action.func(gameState, event, setCurrentEvent);
        }}>{action.name}</Button>
    ));
    
    return (
        <div className="p-8 border-2 flex flex-col justify-start items-center gap-3">
            <span>{description}</span>
            <div className="flex flex-row justify-center items-center gap-3">
                {buttons}
            </div>
        </div>
    )
}
