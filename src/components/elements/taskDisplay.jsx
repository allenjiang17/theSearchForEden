
import { useContext } from "react";
import { GameContext } from "../../game";

const taskMap = {
    18: 'The First Hour of the Day',
    17: 'The Second Hour of the Day',
    16: 'The Third Hour of the Day',
    15: 'The Fourth Hour of the Day',
    14: 'The Fifth Hour of the Day',
    13: 'The Sixth Hour of the Day',
    12: 'The Seventh Hour of the Day',
    11: 'The Eighth Hour of the Day',
    10: 'The Ninth Hour of the Day',
    9: 'The Tenth Hour of the Day',
    8: 'The Eleventh Hour of the Day',
    7: 'The Twelfth Hour of the Day',
    6: 'The First Hour of the Night',
    5: 'The Second Hour of the Night',
    4: 'The Third Hour of the Night',
    3: 'The Fourth Hour of the Night',
    2: 'The Fifth Hour of the Night',
    1: 'The Sixth Hour of the Night', // this is midnight so we stop here?
    0: 'The Seventh Hour of the Night' 
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
