import Button from "./elements/button";
import { useState, createContext } from 'react';
import Map from "./location";
import Character from "./main/navigation/character";
import Inventory from "./main/navigation/inventory";
import Settings from "./main/navigation/settings";
import Sound from "./elements/sound";


export default function MainBody({page}) {

    if (page === "map") {
        return (
            <div>
                <Map/>
                <Sound 
                    url="/theSearchForEden/sounds/Nothing_but_the_blood.mp3"
                    playStatus={Sound.status.PLAYING}
                    volume={30}
                    loop={true} />
            </div>
        )
    } else if (page === "character") {
        return <Character/>
    } else if (page === "inventory") {
        return <Inventory/>
    } else if (page === "settings") {
        return <Settings/>
    }
    //and so on...



}
