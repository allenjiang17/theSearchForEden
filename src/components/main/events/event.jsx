import { AreaOneEvents} from "../../../locations/areaOne/events";
import CombatEvent from "./combat";
import GenericEvent from "./generic";


export default function Event({event, setCurrentEvent}) {

    const eventObj = AreaOneEvents[event];

    if (event === "combat") {
        return <CombatEvent key={event} event={eventObj} setCurrentEvent={setCurrentEvent} />
    } else {
        return <GenericEvent key={event}event={eventObj} setCurrentEvent={setCurrentEvent}/>
    }
}


