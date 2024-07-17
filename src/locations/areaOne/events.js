import { produce } from "immer";

/*README FOR ADDING EVENTS

eventId: {
    title: "Title of event",
    id: "eventId", -- choose a UNIQUE ID. convention is "eventNameEventLocation" like "donatingMoneyTemple"
    encounterRate: 1,  -- weight for RNG selection ranging from 0-1.  
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
        encounterRate: 1,
        description: "You wake up, and you feel strange. Something like scales falls from your eyes, and it is as if you can see for the first time. Everything that felt familiar to you now feels distant. Your thinking still feels futile, and your foolish heart still feels darkened. But you have this sense that eternity has been set on your heart. And it calls to you to go from your country, your people, and your father’s household, and to a new land.",
        actions: [{
            name: "Begin your adventure",
            actionType: "setLocation",
            func: (gameState) => {
                gameState.setLocation("house");
            }
        }]
    },
    "donatingMoneyTemple":{
        title: "Donating Money",
        id: "donatingMoneyTemple",
        encounterRate: 1,
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
        encounterRate: 1, 
        description: "You don't have enough money to do that",
        actions: []
    },
    "gainHolinessPointTemple": {
        title: "Gain holiness point",
        id: "gainHolinessPointTemple",
        encounterRate: 1, 
        description: "You gained a holiness point! Yay!",
        actions: []
    },
    "showOffTemple": {
        title: "Show off!",
        id: "showOffTemple",
        encounterRate: 1, 
        description: "You're just showing off at this point.",
        actions: []
    },
    "gotBarleyFieldOfBoaz":{
        title: "Got Barley? ",
        id: "gotBarleyFieldOfBoaz",
        encounterRate: 1, 
        description: "A kind man walks up to you and tells you that you may follow along his laborers and glean some of his barley for free. You thank him and glean a bundle of barley.",
        actions: []
    },
    "restBedroom":{        
        title: "Rest",
        id: "restBedroom",
        encounterRate: 1,
        description: "You seem pretty tired -- do you want to take a nap on your bed?",
        actions: [{
            name: "Rest",
            actionType: "setCharCondition",
            func: (gameState) => {
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.hp = 100;
                    }));
                    gameState.setCurrentEvent("finishRestBedroom");
            }
        }]
    },
    "finishRestBedroom":{        
        title: "Rest",
        id: "finishRestBedroom",
        encounterRate: 1,
        description: "You wake up nice and refreshed. Your Physical HP is back to full!",
        actions: []
    },
    "prayCloset":{        
        title: "Pray",
        id: "prayCloset",
        encounterRate: 1,
        description: "You seem to be anxious about many things -- do you want to spend some time in prayer and meditation?",
        actions: [{
            name: "Pray",
            actionType: "setCharCondition",
            func: (gameState) => {
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.spiritualHp = 100;
                    }));
                    gameState.setCurrentEvent("finishprayCloset");
            }
        }]
    },
    "finishprayCloset":{        
        title: "Pray",
        id: "finishPrayCloset",
        encounterRate: 1,
        description: "You feel a deep sense of peace. Your Spiritual HP is back to full!",
        actions: []
    },
    "searchForCoinsBedroom":{        
        title: "Search for Coins",
        id: "searchForCoinsBedroom",
        encounterRate: 1,
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
        encounterRate: 1, 
        description: "You searched carefully and found a lost coin! You rejoice! (Money +1)",
        actions: []
    },
    "nothingFoundBedroom":{
        title: "Nothing found",
        id: "nothingFoundBedroom",
        encounterRate: 1, 
        description: "You searched carefully but did not find anything",
        actions: []
    },
    "getSomeClothes":{
        title: "Get Some Clothes",
        id: "getSomeClothes",
        encounterRate: 1, 
        description: '\"Whoa! Whoa! You can\'t walk in here without clothes! What in the world are you thinking?\"\n\n\"I am so sorry,\" you say, \"You see, that\'s why I\'m here. I need some clothes."\n\n\“Ah, I see,\” the Tailor says. \“Tell you what—I\'ll help you out. If you get me 5 pieces of garment, I\'ll make you something to wear. It\'ll cost you 2 Earthly Coins though.\"',
        actions: []
    },
    "gotManna":{
        title: "Got Manna?",
        id: "gotManna",
        encounterRate: 1, 
        description: "You wonder, \"What is it?\" You take it and give it a little lick, and it tastes like wafers made with honey. You put some in your bag.",
        autoAction: {
            name: "Get Manna",
            actionType: "setInventory",
            func: (gameState) => {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.items.set("manna", newInventory.items.get("manna") || 0 + 1);
                    }));            
            }
        },
        actions: []
    },
    "gotLocust":{
        title: "Got Locust?",
        id: "gotLocust",
        encounterRate: 1, 
        description: "You find a wild locust! You patiently wait for the right opportunity... and then you reach out and grab it! Very dextrous of you.",
        autoAction: {
            name: "Get Locust",
            actionType: "setInventory",
            func: (gameState) => {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.items.set("locust", newInventory.items.get("locust") || 0 + 1);
                    }));            
            }
        },
        actions: []
    },

    "lookBronzeSerpent":{        
        title: "Look at the Bronze Serpent",
        id: "lookBronzeSerpent",
        encounterRate: 1,
        description: "Would you like to be healed? It will cost 5 Heavenly Coins.",
        actions: [{
            name: "Be Healed",
            actionType: "setCharCondition",
            func: (gameState) => {
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.hp = 100;
                    }));
                    gameState.setCurrentEvent("finishLookBronzeSerpent");
            }
        }]
    },
    "finishLookBronzeSerpent":{        
        title: "Look at the Bronze Serpent",
        id: "finishLookBronzeSerpent",
        encounterRate: 1,
        description: "Your Physical HP is back to full!",
        actions: []
    },
    "greatFear":{        
        title: "Great Fear",
        id: "greatFear",
        encounterRate: 1,
        description: "Your body shivers. Terror and dread descend on your body. A thundering voice speaks, \"Was it because there were no graves in the City of Destruction that you have come to the desert to die?\" Larry\'s Note: Give option to fight Great Fear or run away.",
        actions: []
    },
    "rescueTheCaptives":{        
        title: "Rescue the Captives",
        id: "rescueTheCaptives",
        encounterRate: 1,
        description: "You see an exhausted man with terror on his face running over to you. \"What\'s the matter?\" you ask.\n\nWith tears in his eyes, the man takes a few large breaths and responds, \"Our cities have been attacked and plundered, and our people have been taken captive.\"\n\n\"Take courage,\" you say, \"I will rescue them!\"",
        actions: []
    },

    "sleepOnStone":{        
        title: "Sleep on the Stone",
        id: "sleepOnStone",
        encounterRate: 1,
        description: "Would you like to lay your head on the stone and go to sleep?",
        actions: [{
            name: "Sleep on the Stone",
            actionType: "setCharCondition",
            func: (gameState) => {
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.spiritualHp = 100;
                    }));
                    gameState.setCurrentEvent("finishSleepOnStone");
            }
        }]
    },
    "finishSleepOnStone":{        
        title: "Sleep on the Stone",
        id: "finishSleepOnStone",
        encounterRate: 1,
        description: "You have a dream, and behold, you see a ladder set up on the earth, with the top of it reaching to heaven. And behold, you see the angels of God ascending and descending on it!\n\nYou wake up with wonder and think, \"Surely the Lord is in this place, and I did not know it.\"\n\nYour Spiritual HP is back to full!",
        actions: []
    }
}
