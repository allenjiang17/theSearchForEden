import Button from "../../elements/button";
import { useContext } from "react";
import { GameContext } from "../../../game";


export default function GenericEvent({title, description, actions}) {
    const gameState = useContext(GameContext);

    const buttons = actions.map((action)=>(
        <Button onClick={()=>{
            action.func(gameState);
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
