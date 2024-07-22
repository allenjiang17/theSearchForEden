import Button from "../../elements/button";
import { Toggle } from "../../elements/toggle";
import { useContext } from "react";
import { GameContext } from "../../../game";
import { produce } from "immer";

export default function Settings() {

    const {settings, setSettings} = useContext(GameContext);

    function clearGameData() {
        localStorage.clear();
        window.location.reload();
    }

    return(
        <div className="flex flex-col justify-center items-start gap-3">
            <span>Settings</span>
            <div className="flex flex-row justify-center items-center gap-2">
                <span>Start Over? </span>
                <Button onClick={clearGameData}>Clear Game Data</Button>
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
                <span>Music On?</span>
                <Toggle active={settings.music} 
                    onClick={()=>{setSettings((produce((settings)=>{settings.music = !settings.music})))}}/>
            </div>
        </div>
    )

}
