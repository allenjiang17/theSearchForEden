import Button from "./elements/button";
import { useState, createContext } from 'react';
import Map from "./location";
import Character from "./main/navigation/character";
import Inventory from "./main/navigation/inventory";
import Settings from "./main/navigation/settings";
import Quests from "./main/navigation/quests";
import Sound from "./elements/sound";


export default function MainBody({page, settings}) {

    if (page === "map") {
        return (
            <div className="w-full">
                <Map/>
                {settings.music ? <Sound 
                    url="/theSearchForEden/sounds/Nothing_but_the_blood.mp3"
                    playStatus={Sound.status.PLAYING}
                    volume={30}
                    loop={true} />
                : null}
            </div>
        )
    } else if (page === "character") {
        return <Character/>
    } else if (page === "inventory") {
        return <Inventory/>
    } else if (page === "settings") {
        return <Settings/>
    } else if (page === "quests") {
        return <Quests/>
    }
    //and so on...



}
