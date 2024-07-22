import Button from "./elements/button";
import { useState, createContext } from 'react';
import Map from "./location";
import Character from "./main/navigation/character";
import Inventory from "./main/navigation/inventory";
import Settings from "./main/navigation/settings";
import Quests from "./main/navigation/quests";
import Bgm from "./elements/bgm";


export default function MainBody({page, settings}) {

    if (page === "map") {
        return (
            <div className="w-full">
                <Map/>
                <Bgm/>
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
