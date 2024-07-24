import { useContext } from "react";
import { GameContext } from "../../game";
import Sound from "./sound";

const bgmMap = {
    "NothingButTheBlood": "/theSearchForEden/sounds/Nothing_but_the_blood.mp3",
    "combat": "theSearchForEden/sounds/combatTheme.mp3"
};

/*
 * React component that plays background music; uses the bgmMap above to map a bgm string to a path
 * and plays it in a loop.
 */
export default function Bgm() {
    const {settings} = useContext(GameContext);

    if(!settings.music) { return <span></span> }

    const bgm_path = bgmMap[settings.bgm];
    if(typeof bgm_path === undefined) {
        bgm_path = bgmMap["NothingButTheBlood"];
    }

    return <Sound url={bgm_path} 
        playStatus={Sound.status.PLAYING} 
        volume={settings.volume} 
        loop={true} />
}
