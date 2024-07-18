import { AreaOneEvents} from "../../../locations/areaOne/events";
import CombatEvent from "./combat";
import GenericEvent from "./generic";


export default function Event({event, setCurrentEvent}) {

    const eventObj = AreaOneEvents[event];

    if (event === "combat") {
        return <CombatEvent event={eventObj} setCurrentEvent={setCurrentEvent} />
    } else {
        return <GenericEvent event={eventObj} setCurrentEvent={setCurrentEvent}/>
    }
}


