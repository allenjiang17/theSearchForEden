
import { useContext } from "react";
import { GameContext } from "../../game";

const taskMap = {
    18: 'Dawn',
    17: 'First Hour',
    16: 'Second Hour',
    15: 'Third Hour',
    14: 'Fourth Hour',
    13: 'Fifth Hour',
    12: 'Sixth Hour',
    11: 'Seventh Hour',
    10: 'Eighth Hour',
    9: 'Ninth Hour',
    8: 'Tenth Hour',
    7: 'Eleventh Hour',
    6: 'Twelfth Hour',
    5: 'First Hour of the Night',
    4: 'Second Hour of the Night',
    3: 'Third Hour of the Night',
    2: 'Fourth Hour of the Night',
    1: 'Fifth Hour of the Night',
    0: 'Sixth Hour of the Night' // this is midnight so we stop here?
}

export default function TaskDisplay() {
    const {ntask} = useContext(GameContext);

    console.log(ntask);

    if(taskMap[ntask]) {
        return <span>{taskMap[ntask]}</span>
    } else {
        return <span>The ??? Hour</span>
    }
}
