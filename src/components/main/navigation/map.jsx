import Location from "../../location"
import { useContext } from "react";
import { GameContext } from "../game";
export default function Map() {

    const {location, setLocation, map, setMap} = useContext(GameContext);


    return <Location key={location} location={location} setLocation={setLocation} map={map} setMap={setMap}/>

}