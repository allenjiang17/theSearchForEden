import Button from "./elements/button";
import { useState, createContext } from 'react';
import Map from "./main/navigation/map";
import Character from "./main/navigation/character";
import Inventory from "./main/navigation/inventory";


export default function MainBody({page}) {

    if (page === "map") {
        return <Map/>
    } else if (page === "character") {
        return <Character/>
    } else if (page === "inventory") {
        return <Inventory/>
    } 
    //and so on...



}