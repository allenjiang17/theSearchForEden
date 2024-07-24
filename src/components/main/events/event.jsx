import { AreaOneEvents} from "../../../locations/areaOne/events";
import CombatEvent from "./combat";
import GenericEvent from "./generic";
import { useContext, useEffect } from "react";
import { GameContext } from "../../../game";
import NightRestEvent from "./rest";


export default function Event({event, setCurrentEvent}) {

    const eventObj = AreaOneEvents[event];

    //all events take up one unit of time
    const {ntask} = useContext(GameContext);

    if (ntask === 0 && event !== "nightRest") {
        return (
            <div>
                <span>You're too tired, and it's way too late. You should go home and sleep.</span>
            </div>)
    }

    if (event === "combat") {
        return <CombatEvent key={event} event={eventObj} setCurrentEvent={setCurrentEvent} />
    } else if (event === "nightRest") {
        return <NightRestEvent key={event} />
    } else {
        return <GenericEvent key={event} event={eventObj} setCurrentEvent={setCurrentEvent}/>
    }
}


