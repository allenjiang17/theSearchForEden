
import { useContext } from "react";
import { GameContext } from "../../game";

const taskMap = {
    36: 'Dawn',
    35: 'Half past Dawn',
    34: 'First Hour',
    33: 'Half past First Hour',
    32: 'Second Hour',
    31: 'Half past Second Hour',
    30: 'Third Hour',
    29: 'Half past Third Hour',
    28: 'Fourth Hour',
    27: 'Half past Fourth Hour',
    26: 'Fifth Hour',
    25: 'Half past Fifth Hour',
    24: 'Sixth Hour',
    23: 'Half past Sixth Hour',
    22: 'Seventh Hour',
    21: 'Half past Seventh Hour',
    20: 'Eighth Hour',
    19: 'Half past Eighth Hour',
    18: 'Ninth Hour',
    17: 'Half past Ninth Hour',
    16: 'Tenth Hour',
    15: 'Half past Tenth Hour',
    14: 'Eleventh Hour',
    13: 'Half past Eleventh Hour',
    12: 'Twelfth Hour',
    11: 'Half past Twelfth Hour',
    10: 'First Hour of the Night',
    9: 'Half past First Hour of the Night',
    8: 'Second Hour of the Night',
    7: 'Half past Second Hour of the Night',
    6: 'Third Hour of the Night',
    5: 'Half past Third Hour of the Night',
    4: 'Fourth Hour of the Night',
    3: 'Half past Fourth Hour of the Night',
    2: 'Fifth Hour of the Night',
    1: 'Half past Fifth Hour of the Night',
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
