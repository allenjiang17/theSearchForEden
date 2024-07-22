import { produce } from "immer";

export const QuestsDict = {
    "getSomeClothes": {
        title: "Get Some Clothes",
        description: "You're naked and ashamed. You need to get some clothes. The tailor said he might be able to help you out if you brought him\n5 chewed up garments and 2 Earthly Coins",
        conditionType: "event",
        conditionFunc: null,
    },
    "senseOfDirection": {
        title: "A Sense of Direction",
        description: "You met a lost man who came from the Land of the Patriarchs. Unfortunately, he doesn't know how to get there, but maybe if you got a sense of direction you'd be able to.",
        conditionType: "inventory",
        conditionFunc: (gameState) => {

            console.log(gameState);
            if (gameState.inventory.items["senseOfDirection"]) {
                gameState.setMap(produce((newMap)=>{
                    newMap["landOfThePatriarchs"].unlocked = true;
                }));
                gameState.setQuests(produce((newQuests)=>{
                    newQuests["senseOfDirection"] = {progress: "complete"};
                }));
            }
        }
    }
}