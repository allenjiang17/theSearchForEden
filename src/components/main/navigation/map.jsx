import { AreaOneLocations } from "../../../locations/areaOne/locations";
import { AreaOneEvents } from "../../../locations/areaOne/events";
import Button from "../../elements/button";
import GenericEvent from "../events/generic";
import { useContext, useEffect } from "react";
import { GameContext } from "../../../game";


export default function Map() {

    const {location, setLocation, currentEvent, setCurrentEvent} = useContext(GameContext);

    const currentLocation = AreaOneLocations[location];
    
    //we'll need some kind of RNG to select the currentEvent out of the possible selection of events for a given location
    const currentEventToShow = AreaOneEvents[currentEvent] ?? getRandomEvent(currentLocation.events);


    useEffect(()=>{
        if (!currentEvent) {
            setCurrentEvent(currentEventToShow);
        }

    },[]);

    console.log(currentEventToShow);

    const locationOptions = currentLocation.children.map((location)=>(
        <Button onClick={()=>{setLocation(location)}}>{AreaOneLocations[location].title}</Button>
    ))

    return (
        <div className="flex flex-col justify-center items-start gap-3">
            <span>{currentLocation.description}</span>
            {currentEventToShow ? <GenericEvent title={currentEventToShow.title} description={currentEventToShow.description} actions={currentEventToShow.actions}/> : null}
            <div className="flex flex-col justify-start items-start gap-3">
                {locationOptions}
                {currentLocation.parent ? <Button onClick={()=>{setLocation(currentLocation.parent)}}>Go back to {AreaOneLocations[currentLocation.parent].title}</Button> : null}
            </div>
        </div>
    )
    
}

function getRandomEvent(events) {

    let probSum = 0;

    for (let event of events) {
        probSum += AreaOneEvents[event].probability;

    }

    let seed = probSum * Math.random();

    for (let event of events) {
        seed -= AreaOneEvents[event].probability;
        if (seed <= 0) {
            return AreaOneEvents[event];
        }
    }
}

