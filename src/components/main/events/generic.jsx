import Button from "../../elements/button";
import { useContext } from "react";
import { GameContext } from "../../../game";


export default function GenericEvent({title, description, actions}) {
    const {location, setLocation} = useContext(GameContext);

    const actionMap = {
        "setLocation": (params) => {
            setLocation(...params)
        },
    };

    function mapAction(action) {
        if (actionMap[action.actionType]) { 
            actionMap[action.actionType](action.params); 
        } else { 
            console.log('Not implemented yet :( allen get on that')
            console.log(action); 
        }
    };

    // console.log(actions);

    const buttons = actions.map((action)=>(
        <Button onClick={()=>{ mapAction(action) }}>{action.name}</Button>
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

export function GenericSurpriseEvent({title, description, actions}) {
    return(<GenericEvent title={title} description={description} actions={actions}/>)
}
