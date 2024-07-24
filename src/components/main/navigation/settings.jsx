import Button from "../../elements/button";
import Toggle from "../../elements/toggle";
import Slider from "../../elements/slider";

import { useContext } from "react";
import { GameContext } from "../../../game";
import { produce } from "immer";

export default function Settings() {

    const {settings, setSettings} = useContext(GameContext);

    function clearGameData() {
        localStorage.clear();
        window.location.reload();
    }
    
    function setVolume(value) {
        setSettings((produce((settings)=>{settings.volume = value})))
    }

    return(
        <div className="flex flex-col justify-center items-start gap-3">
            <span className="font-semibold">Settings</span>
            <div className="flex flex-row justify-between items-center gap-2">
                <span>Start Over? </span>
                <Button onClick={clearGameData}>Clear Game Data</Button>
            </div>
            <div className="flex flex-row justify-between items-center gap-2">
                <span>Music</span>
                <Toggle active={settings.music} 
                    onClick={()=>{setSettings((produce((settings)=>{settings.music = !settings.music})))}}/>
            </div>
            <div className="flex flex-row justify-between items-center gap-2">
                <span>Volume</span>
                <Slider min={0} max={100} value={settings.volume} onChange={setVolume}/>
            </div>
        </div>
    )
}
