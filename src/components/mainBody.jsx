import Button from "./elements/button";
import { useState, createContext } from 'react';
import Map from "./main/navigation/map";
import Character from "./main/navigation/character";


export default function MainBody() {

    const [page, setPage] = useState("map");

    if (page === "map") {
        return <Map/>
    } else if (page === "character") {
        return <Character/>
    }
    //and so on...



}