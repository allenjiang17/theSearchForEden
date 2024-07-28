import { useContext, useState } from "react";
import { GameContext } from "../../../game";
import { IncantationsDictionary } from "../../../locations/incantations";

export default function Incantations() {

    const {character, setCharacter} = useContext(GameContext);

    const incantationDivs = character.incantations.map((incantation, index)=>{
        return <Incantation key={index} incantation={incantation}/>;
    })

    return(
        <div className="w-full flex flex-row justify-between items-start gap-3">
            <div className="w-full flex flex-col gap-4">
                <span className="font-semibold">The Book of Incancations</span>
                {incantationDivs}
            </div>
        </div>
    )
}


function Incantation({incantation}) {
    return(
        <div className="border-2 flex flex-col gap-2 p-3">
            <span className="font-semibold">{IncantationsDictionary[incantation].title}</span>
            <span>Type: {IncantationsDictionary[incantation].type}</span>
            <span>Base Power: {IncantationsDictionary[incantation].basePower}</span>
            <span>Incantation: <span className="italic animate-pulse text-blue-500">{IncantationsDictionary[incantation].incantation}</span></span>

        </div>
    )
}