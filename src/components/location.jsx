import { AreaOneLocations } from "../locations/areaOne/locations";
import { AreaOneEvents } from "../locations/areaOne/events";
import { AreaOneEnemies } from "../locations/areaOne/enemies";
import Button from "./elements/button";
import Event from "./main/events/event";
import { useContext, useState, useEffect } from "react";
import { GameContext } from "../game";
import {produce} from "immer";


export default function Location() {

    const {location, setLocation, map, setMap} = useContext(GameContext);

    const currentLocation = AreaOneLocations[location];
    const [currentEvent, setCurrentEvent] = useState(map[location]?.currentEvent ?? getRandomEvent(currentLocation));
    
    const locationOptions = currentLocation.children.map((location)=>(map[location]?.unlocked ? 
            <Button onClick={()=>{setLocation(location)}}>{AreaOneLocations[location].title}</Button>
        : null
    ));

    useEffect(()=>{
        setCurrentEvent(getRandomEvent(currentLocation));
    },[location]);

    useEffect(()=>{
        setMap(produce((map)=>{map[location].currentEvent = currentEvent}));
    },[currentEvent]);


    // If you don't like the dynamic text, switch dialoguebox back to a static span
    return (
        <div className="w-full flex flex-col justify-center items-start gap-3">
            <span>{currentLocation.description}</span>
            {currentEvent ? <Event event={currentEvent} setCurrentEvent={setCurrentEvent}/> : null}
            <div className="flex flex-col justify-start items-start gap-3">
                {locationOptions}
                {currentLocation.parent ? 
                        <Button onClick={()=>{setLocation(currentLocation.parent)}}>Leave {AreaOneLocations[currentLocation.id].title}</Button> : null}
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



