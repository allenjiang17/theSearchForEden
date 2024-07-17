import { AreaOneEvents} from "../../../locations/areaOne/events";
import CombatEvent from "./combat";
import GenericEvent from "./generic";


export default function Event({event}) {

    if (event === "combat") {
        return <CombatEvent />
    } else {
        const eventObj = AreaOneEvents[event];
        return <GenericEvent event={eventObj} />
    }
}


