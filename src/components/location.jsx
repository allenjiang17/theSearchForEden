import { AreaOneLocations } from "../locations/areaOne/locations";
import { AreaOneEvents } from "../locations/areaOne/events";
import { AreaOneEnemies } from "../locations/areaOne/enemies";
import Button from "./elements/button";
import Event from "./main/events/event";
import { useContext, useEffect } from "react";
import { GameContext } from "../game";


export default function Location() {

    const {location, setLocation, currentEvent, setCurrentEvent} = useContext(GameContext);
    console.log(currentEvent);
    
    const currentLocation = AreaOneLocations[location];
    let currentEventToShow =  currentEvent ?? getRandomEvent(currentLocation);

    useEffect(()=>{
            console.log("here");

            setCurrentEvent(getRandomEvent(AreaOneLocations[location]));

    },[location]);

    const locationOptions = currentLocation.children.map((location)=>(
        <Button onClick={()=>{setLocation(location)}}>{AreaOneLocations[location].title}</Button>
    ))

    return (
        <div className="flex flex-col justify-center items-start gap-3">
            <span>{currentLocation.description}</span>
            {currentEventToShow ? <Event event={currentEventToShow}/> : null}
            <div className="flex flex-col justify-start items-start gap-3">
                {locationOptions}
                {currentLocation.parent && currentEventToShow !== "combat" ? <Button onClick={()=>{setLocation(currentLocation.parent)}}>Go back to {AreaOneLocations[currentLocation.parent].title}</Button> : null}
            </div>
        </div>
    )
    
}

function getRandomEvent(currentLocation) {

    let probSum = 0;

    for (let event of currentLocation.events) {
        probSum += AreaOneEvents[event].encounterRate;
    }

    if (currentLocation.enemies) {
        for (let enemy of currentLocation.enemies) {
            probSum += AreaOneEnemies[enemy].encounterRate;
        }
    }
    let seed = probSum * Math.random();

    for (let event of currentLocation.events) {
        seed -= AreaOneEvents[event].encounterRate;
        if (seed <= 0) {
            return event;
        }
    }

    if (currentLocation.enemies) {

        for (let enemy of currentLocation.enemies) {
            seed -= AreaOneEnemies[enemy].encounterRate;
            if (seed <= 0) {
                return "combat";
            }
        }

    }

}



