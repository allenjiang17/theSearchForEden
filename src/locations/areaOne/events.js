import { produce } from "immer";

/*README FOR ADDING EVENTS

eventId: {
    title: "Title of event",
    id: "eventId", -- choose a UNIQUE ID. convention is "eventNameEventLocation" like "donatingMoneyTemple"
    probability: 1,  -- weight for RNG selection ranging from 0-1.  
    description: "Description of event" -- will display in the actual body of the event
    actions: [{
            name: "Begin your adventure", -- name of action
            actionType: "setLocation", --type of action
            func: (gameState) => { -- function that will be called when the action is selected. gameState includes all game state variables
                gameState.setLocation("world");
            }
        }]}
*/


export const AreaOneEvents = {
    "beginnings": {
        title: "Beginnings",
        id: "beginnings",
        probability: 1,
        description: "You wake up, and you feel strange. Something like scales falls from your eyes, and it is as if you can see for the first time. Everything that felt familiar to you now feels distant. Your thinking still feels futile, and your foolish heart still feels darkened. But you have this sense that eternity has been set on your heart. And it calls to you to go from your country, your people, and your father’s household, and to a new land.",
        actions: [{
            name: "Begin your adventure",
            actionType: "setLocation",
            func: (gameState) => {
                gameState.setLocation("world");
            }
        }]
    },
    "donatingMoneyTemple":{
        title: "Donating Money",
        id: "donatingMoneyTemple",
        probability: 1,
        description: "You approach the Temple of Jerusalem, and you see many rich people putting their gifts into the temple treasury. What would you like to do?",
        actions: [
            {
                name: "Put two coins in the treasury",
                actionType: "setInventory",
                func: (gameState) => {
                    if (gameState.inventory.money >= 2) {
                        gameState.setInventory(produce((newInventory)=>{
                            newInventory.money -= 2;
                        }));
                        gameState.setCurrentEvent("gainHolinessPointTemple");
                    } else {
                        gameState.setCurrentEvent("noMoneyTemple");

                    }
                }
            }, 
            {
                name: "Put three coins in the treasury",
                actionType: "setInventory",
                func: (gameState) => {
                    if (gameState.inventory.money >= 3) {
                        gameState.setInventory(produce((newInventory)=>{
                            newInventory.money -= 3;
                        }));
                        gameState.setCurrentEvent("showOffTemple");
                    } else {
                        gameState.setCurrentEvent("noMoneyTemple");

                    }
                }
            }, 
        ],
    },
    "noMoneyTemple":{
        title: "No Money",
        id: "noMoneyTemple",
        probability: 1, 
        description: "You don't have enough money to do that",
        actions: []
    },
    "gainHolinessPointTemple": {
        title: "Gain holiness point",
        id: "gainHolinessPointTemple",
        probability: 1, 
        description: "You gained a holiness point! Yay!",
        actions: []
    },
    "showOffTemple": {
        title: "Show off!",
        id: "showOffTemple",
        probability: 1, 
        description: "You're just showing off at this point.",
        actions: []
    },
    "gotBarleyFieldOfBoaz":{
        title: "Got Barley? ",
        id: "gotBarleyFieldOfBoaz",
        probability: 1, 
        description: "You see a large field of barley with many harvesters. A kind man walks up to you and tells you that you may follow along his laborers and glean some of his barley for free. You thank him and glean a bundle of barley.",
        actions: []
    },
    "restBedroom":{        
        title: "Rest",
        id: "restBedroom",
        probability: 1,
        description: "You seem pretty tired -- take a nap on your bed?",
        actions: [{
            name: "Rest",
            actionType: "setCharCondition",
            func: (charCondition, setCharCondition) => {
                    setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.hp = 100;
                    }));
            }
        }]
    },
    "searchForCoinsBedroom":{        
        title: "Search for Coins",
        id: "searchForCoinsBedroom",
        probability: 1,
        description: "You've lost a number of coins in this space in the past...perhaps a careful search will turn up fruitful?",
        actions: [{
            name: "Search",
            actionType: "setInventory",
            func: (gameState) => {
                if (Math.random() < 0.5) {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.money += 1;
                    }));
                    gameState.setCurrentEvent("gainedCoinBedroom");
                } else {
                    gameState.setCurrentEvent("nothingFoundBedroom");

                }
        }
        }]
    },
    "gainedCoinBedroom":{
        title: "You gained a coin!",
        id: "gainedCoinBedroom",
        probability: 1, 
        description: "You searched carefully and found a lost coin! You rejoice! (Money +1)",
        actions: []
    },
    "nothingFoundBedroom":{
        title: "Nothing found",
        id: "nothingFoundBedroom",
        probability: 1, 
        description: "You searched carefully but did not find anything",
        actions: []
    }
}
