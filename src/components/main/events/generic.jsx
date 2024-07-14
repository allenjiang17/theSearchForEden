import Button from "../../elements/button";
import { useContext } from "react";
import { GameContext } from "../../../game";

export default function GenericEvent({title, description, actions}) {

    const {location, setLocation} = useContext(GameContext);

    console.log(actions);

    const buttons = actions.map((action)=>(
        <Button onClick={()=>{
            console.log(action);
            if (action.actionType === "setLocation") {
                setLocation(...action.params);
            }
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