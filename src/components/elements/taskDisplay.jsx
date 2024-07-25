
import { useContext } from "react";
import { GameContext } from "../../game";

const taskMap = {
    36: 'Dawn',
    35: 'Dawn',
    34: 'First Hour of the Day',
    33: 'First Hour of the Day',
    32: 'Second Hour of the Day',
    31: 'Second Hour of the Day',
    30: 'Third Hour of the Day',
    29: 'Third Hour of the Day',
    28: 'Fourth Hour of the Day',
    27: 'Fourth Hour of the Day',
    26: 'Fifth Hour of the Day',
    25: 'Fifth Hour of the Day',
    24: 'Sixth Hour of the Day',
    23: 'Sixth Hour of the Day',
    22: 'Seventh Hour of the Day',
    21: 'Seventh Hour of the Day',
    20: 'Eighth Hour of the Day',
    19: 'Eighth Hour of the Day',
    18: 'Ninth Hour of the Day',
    17: 'Ninth Hour of the Day',
    16: 'Tenth Hour of the Day',
    15: 'Tenth Hour of the Day',
    14: 'Eleventh Hour of the Day',
    13: 'Eleventh Hour of the Day',
    12: 'Twelfth Hour of the Day',
    11: 'Twelfth Hour of the Day',
    10: 'First Hour of the Night',
    9: 'First Hour of the Night',
    8: 'Second Hour of the Night',
    7: 'Second Hour of the Night',
    6: 'Third Hour of the Night',
    5: 'Third Hour of the Night',
    4: 'Fourth Hour of the Night',
    3: 'Fourth Hour of the Night',
    2: 'Fifth Hour of the Night',
    1: 'Fifth Hour of the Night',
    0: 'Sixth Hour of the Night', // midnight
}

export default function TaskDisplay() {
    const {ntask} = useContext(GameContext);

    if(taskMap[ntask]) {
        return <span>{taskMap[ntask]}</span>
    } else {
        return <span>The ??? Hour</span>
    }
}
