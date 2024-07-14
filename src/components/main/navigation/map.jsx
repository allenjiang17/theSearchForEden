import { AreaOneLocations } from "../../../locations/areaOne/locations";
import { AreaOneEvents } from "../../../locations/areaOne/events";
import Button from "../../elements/button";
import GenericEvent from "../events/generic";
import { useContext } from "react";
import { GameContext } from "../../../game";


export default function Map() {

    const {location, setLocation} = useContext(GameContext);

    const currentLocation = AreaOneLocations[location];
    const currentEvent = AreaOneEvents[currentLocation.event];

    const locationOptions = currentLocation.children.map((location)=>(
        <Button onClick={()=>{setLocation(location)}}>{AreaOneLocations[location].title}</Button>
    ))

    return (
        <div className="flex flex-col justify-center items-start gap-3">
            <span>{currentLocation.description}</span>
            {currentEvent ? <GenericEvent title={currentEvent.title} description={currentEvent.description} actions={currentEvent.actions}/> : null}
            <div className="flex flex-col justify-start items-start gap-3">
                {locationOptions}
                {currentLocation.parent ? <Button onClick={()=>{setLocation(currentLocation.parent)}}>Go back to {AreaOneLocations[currentLocation.parent].title}</Button> : null}
            </div>
        </div>
    )
    
}

