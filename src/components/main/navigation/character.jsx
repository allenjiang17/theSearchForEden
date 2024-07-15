import { useContext } from "react";
import { GameContext } from "../../../game";

export default function Character() {

    const {character, setCharacter} = useContext(GameContext);

    return(
        <div className="flex flex-col gap-4">
            <div className="flex flex-col justify-start items-start gap-2">
                <div>
                    <span>Class: </span>
                    <span>{character.class}</span>
                </div>
                <div>
                    <span>Level: </span>
                    <span>{character.level}</span>
                </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-2">
                <span className="font-semibold">Stats</span>
                <div>
                    <span>Physical HP: </span>
                    <span>{character.stats.hp}</span>
                </div>
                <div>
                    <span>Strength: </span>
                    <span>{character.stats.strength}</span>
                </div>
                <div>
                    <span>Defense: </span>
                    <span>{character.stats.defense}</span>
                </div>
                <div>
                    <span>Spiritual HP: </span>
                    <span>{character.stats.spiritualHp}</span>
                </div>
                <div>
                    <span>Zeal: </span>
                    <span>{character.stats.zeal}</span>
                </div>
                <div>
                    <span>Resilience:</span>
                    <span>{character.stats.resilience}</span>
                </div>
            </div>
        </div>
    )
}