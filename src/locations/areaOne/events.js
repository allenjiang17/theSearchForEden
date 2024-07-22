import { produce } from "immer";
import { updateInventory } from "../../utils/misc";

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
    "nightRest": {
        title: "",
        id: "nightRest",
        encounterRate: 1,
        description: "",
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
                func: (gameState, event, setCurrentEvent) => {
                    if (gameState.inventory.money >= 2) {
                        gameState.setInventory(produce((newInventory)=>{
                            newInventory.money -= 2;
                        }));
                        setCurrentEvent("gainHolinessPointTemple");
                    } else {
                        setCurrentEvent("noMoneyTemple");

                    }
                }
            }, 
            {
                name: "Put three coins in the treasury",
                actionType: "setInventory",
                func: (gameState, event, setCurrentEvent) => {
                    if (gameState.inventory.money >= 3) {
                        gameState.setInventory(produce((newInventory)=>{
                            newInventory.money -= 3;
                        }));
                        setCurrentEvent("showOffTemple");
                    } else {
                        setCurrentEvent("noMoneyTemple");

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
            func: (gameState, event, setCurrentEvent) => {
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.hp = 100;
                    }));
                    setCurrentEvent("finishRestBedroom");
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
            func: (gameState, event, setCurrentEvent) => {
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.spiritualHp = 100;
                    }));
                    setCurrentEvent("finishprayCloset");
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
        description: "You've lost a number of coins in this space in the past... perhaps a careful search will turn up fruitful?",
        actions: [{
            name: "Search",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                if (Math.random() < 0.5) {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.money += 1;
                    }));
                    setCurrentEvent("gainedCoinBedroom");
                } else {
                    setCurrentEvent("nothingFoundBedroom");

                }
        }
        }]
    },
    "gainedCoinBedroom":{
        title: "You gained a coin!",
        id: "gainedCoinBedroom",
        encounterRate: 1, 
        description: "You searched carefully and found a lost coin! You call your friends and neighbors together and says, \"Rejoice with me; I have found my lost coin.\"",
        actions: []
    },
    "nothingFoundBedroom":{
        title: "Nothing found",
        id: "nothingFoundBedroom",
        encounterRate: 1, 
        description: "You searched carefully but did not find anything. Maybe next time.",
        actions: []
    },
    "getResolve":{
        title: "Get Resolve",
        id: "getResolve",
        encounterRate: 1, 
        description: "\"Hello there\", you say. \n\n\"Ah, yes,\" the woman says, \"You are just the one I seek.\"\n\n\"Me? Why?\"\n\n\"Because you, young sleeper, have woken up. And your journey to Eden has begun.\"\n\n\"What are you talking about?\" you ask, with bewilderment and confusion in your eyes.\n\n\"All will make sense one day. For now, take this. You will need it if you are to stand a chance in  spiritual battles. I will see you soon.\"\n\nThe old woman hands you Spirit of Resolve, and she continues on her way. \n\n(+1 Spirit of Resolve)",
        autoAction: {
            name: "Get Resolve",
            actionType: "setInventory",
            func: (gameState) => {
                    gameState.setInventory(produce((newInventory)=>{
                        updateInventory(newInventory, "spiritOfResolve");
                    }));            
            }
        },
        actions: []
    },
    "getFigLeaf":{
        title: "Get Fig Leaf",
        id: "getFigLeaf",
        encounterRate: 1, 
        description: "Would you like to gather a fig leaf?",
        actions: [{
            name: "Grab Fig Leaf",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                if (Math.random() > 0.7) {
                    gameState.setInventory(produce((newInventory)=>{
                        updateInventory(newInventory, "figLeaf");
                        updateInventory(newInventory, "figLeaf");
                        updateInventory(newInventory, "figLeaf");
                    }));
                    setCurrentEvent("getFigLeafLucky");
                } else {
                    gameState.setInventory(produce((newInventory)=>{
                        updateInventory(newInventory, "figLeaf");
                    })); 
                    setCurrentEvent("getFigLeafComplete");  
                }
        }}]
    },
    "getFigLeafLucky":{
        title: "Get Fig Leaf Lucky",
        id: "getFigLeafLucky",
        encounterRate: 1, 
        description: "You gently pull a large fig leaf, and as you do, two other fig leaves come off with it! Cowabunga! You feel proud of yourself for being so skilled at leaf-pulling.\n\n+3 Fig Leaves",
        actions: []
    },
    "getFigLeafComplete":{
        title: "Get Fig Leaf Complete",
        id: "getFigLeafComplete",
        encounterRate: 1, 
        description: "You gently pull a large fig leaf off of the tree.\n\n+1 Fig Leaf",
        actions: []
    },
    "getSomeClothes":{
        title: "Get Some Clothes",
        id: "getSomeClothes",
        encounterRate: 1, 
        description: '\"Whoa! Whoa! You can\'t walk in here without clothes! What in the world are you thinking?\"\n\n\"I am so sorry,\" you say with embarrassment, \"I didn\'t realize.\" You feel naked and ashamed.\n\n\“Well, it seems like today is your lucky day,\” the Crafty Fellow says. \“I can help you out. If you get me 10 fig leaves and pay me 2 earthly coins, I\'ll make you something to wear.\"\n\nYou stare at him with skepticism. \"Is your word trustworthy? To be honest, it\'s hard for me to trust somebody named \'Crafty Fellow.\'\"\n\n\"Oh, that\'s just a misunderstanding. People call me crafty because I\'m good at crafting things.\" \n\n"I see,\" you quietly say, as you walk out of the room.',
        quests: [{
            id: "getSomeClothes",
            action: "start",
        }],
        actions: [],
        autoAction: {
            name: "Check Inventory",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {

                const questState = gameState.quests["getSomeClothes"];

                if (questState && questState.progress !== "complete") {
                    if (gameState.inventory.items["figLeaf"] >= 10 && gameState.inventory.money >= 2) {
                        setCurrentEvent("getSomeClothesCompleteStep1");
                    } else {
                        setCurrentEvent("getSomeClothesIncomplete");
                    }
                }

                if (questState && questState.progress === "complete") {
                    setCurrentEvent("getSomeBetterClothes");
                }
            }
        },
    },
    "getSomeClothesIncomplete":{
        title: "Get Some Clothes Incomplete",
        id: "getSomeClothesIncomplete",
        encounterRate: 1, 
        description: 'The Crafty Fellow looks up from his workbench. \n\n“Do you have 10 fig leaves and 2 earthly coins yet? No? Then come back when you get them.”',
        actions: []
    },
    "getSomeClothesCompleteStep1":{
        title: "Get Some Clothes Complete",
        id: "getSomeClothesCompleteStep1",
        encounterRate: 1, 
        description: 'The Crafty Fellow looks up from his workbench. “You got the stuff? Good. Give them here”',
        actions: [{
            name: "Give 10 Fig Leaves and 2 Earthly Coins",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.money = Math.max(0, newInventory.money - 2);
                        newInventory.items["figLeaf"] = Math.max(0, newInventory.items["figLeaf"] - 10); 
                    }));
                    setCurrentEvent("getSomeClothesCompleteStep2");
            }
        }]
    },   
    "getSomeClothesCompleteStep2":{
        title: "Get Some Clothes Complete Step 2",
        id: "getSomeClothesCompleteStep2",
        encounterRate: 1, 
        description: "\"Great,\" the Crafty Fellow says.\n\nYou watch him work his magic. In a few moments, he presents to you a Fig Leaf Loincloth! \n\n\"Here you go.\" \n\n(+1 Fig Leaf Loincloth)",
        quests: [{
            id: "getSomeClothes",
            action: "complete",
        }],
        autoAction: {
            name: "Gain Fig Leaf Loincloth",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.equipment.push("figLeafLoincloth");
                    }));
            }
        },
        actions: []
    },
    "getSomeBetterClothes":{
        title: "Get Some Better Clothes",
        id: "getSomeBetterClothes",
        encounterRate: 1, 
        description: '\"Good, I see you are not naked today. How are you liking your fig leaves?\" the Crafty Fellow asks.\n\n"They\'re not bad,\" you say, \"but they don\'t cover a whole lot of my body.\"\n\n"Well, what do you expect? You only gave me 10 leaves."\n\n\"Yes, I understand. But I wonder--is there anything else that you can make that can boost my defense a bit more?\"\n\n\"Of course! They don\'t call me the Crafty Fellow for no reason. I\'ll tell you what--give me 8 garments, and I\'ll make you something. This one will cost you 4 Earthly Coins though.',
        quests: [{
            id: "getSomeBetterClothes",
            action: "start",
        }],
        autoAction: {
            name: "Check Inventory",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {

                const questState = gameState.quests["getSomeBetterClothes"];

                if (questState && questState.progress !== "complete") {
                    if (gameState.inventory.items["chewedUpGarments"] >= 8 && gameState.inventory.money >= 4) {
                        setCurrentEvent("getSomeBetterClothesCompleteStep1");
                    } else {
                        setCurrentEvent("getSomeBetterClothesIncomplete");
                    }
                }

                if (questState && questState.progress === "complete") {
                    setCurrentEvent("craftyFellowShop");
                }
            }
        },
        actions: []
    },
    "getSomeBetterClothesIncomplete":{
        title: "Get Some Better Clothes Incomplete",
        id: "getSomeBetterClothesIncomplete",
        encounterRate: 1, 
        description: 'The Crafty Fellow up from his workbench. \n“Do you have 8 garment pieces and 4 Earthly Coins yet? No? Then come back when you get them.”',
        actions: []
    },
    "getSomeBetterClothesCompleteStep1":{
        title: "Get Some Better Clothes Complete",
        id: "getSomeBetterClothesCompleteStep1",
        encounterRate: 1, 
        description: 'The Crafty Fellow looks up from his workbench. “You got the stuff? Good. Give them here”',
        actions: [{
            name: "Give 8 Chewed-up Garments and 4 Earthly Coins",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.money = Math.max(0, newInventory.money - 4);
                        newInventory.items["chewedUpGarments"] = Math.max(0, newInventory.items["chewedUpGarments"] - 8); 
                    }));
                    setCurrentEvent("getSomeBetterClothesCompleteStep2");
            }
        }]
    },   
    "getSomeBetterClothesCompleteStep2":{
        title: "Get Some Better Clothes Complete Step 2",
        id: "getSomeBetterClothesCompleteStep2",
        encounterRate: 1, 
        description: "\"What the—-where did you get this stuff from? Moths? Well, I’ll suppose they’ll have to do. Here you go.\" \n\n(+1 Garment of Skin)",
        quests: [{
            id: "getSomeBetterClothes",
            action: "complete",
        }],
        autoAction: {
            name: "Gain Garment of Skin",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.equipment.push("garmentOfSkin");
                    }));
            }
        },
        actions: []
    },
    "craftyFellowShop": {
        title: "Crafty Fellow Shop",
        id: "craftyFellowShop",
        encounterRate: 1, 
        description: "The Crafty Fellow looks up from his workbench and says, \"What do you want?\"\n\n\"Well,\"you begin, \"I was wondering if you have anything stronger--\"\n\nThe Crafty Fellow cuts you off, \"Do you think I\'m a vending machine or something?\"\n\nYou are befuddled. \"What\'s a vending machine?\" you ask.\n\n\"Oh, that\'s right,\" the Crafty Fellow says, \"We live in biblical times. Those darn things haven\'t been invented yet. My point is--I don\'t have anything for you yet. Come back another day.\"",
        actions: []
    },
    "gotManna":{
        title: "Got Manna?",
        id: "gotManna",
        encounterRate: 1, 
        description: "You wonder, \"What is it?\" You take it and give it a little lick, and it tastes like wafers made with honey. You put some in your bag. \n\n(+1 Manna)",
        autoAction: {
            name: "Get Manna",
            actionType: "setInventory",
            func: (gameState) => {
                    gameState.setInventory(produce((newInventory)=>{
                        updateInventory(newInventory, "manna");
                    }));            
            }
        },
        actions: []
    },
    "captureLocust":{
        title: "Capture Locust",
        id: "captureLocust",
        encounterRate: 1, 
        description: "You find a wild locust! Do you want to try to catch it?",
        actions: [{
            name: "Catch the Locust",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                if (Math.random() < 0.5) {
                    gameState.setInventory(produce((newInventory)=>{
                        updateInventory(newInventory, "locust");
                    }));
                    setCurrentEvent("captureLocustSuccess");
                } else {
                    gameState.setInventory(produce((newInventory)=>{
                        updateInventory(newInventory, "handfulOfDirt");
                    }));
                    setCurrentEvent("captureLocustFailure");

                }
        }
        }]
    },
    "captureLocustSuccess":{
        title: "You got the locust!",
        id: "captureLocustSuccess",
        encounterRate: 1, 
        description: "You patiently wait for the right opportunity... and then you reach out and grab it! Very dextrous of you. \n\n+1 Locust",
        actions: []
    },
    "captureLocustFailure":{
        title: "You couldn't get the locust.",
        id: "captureLocustFailure",
        encounterRate: 1, 
        description: "You patiently wait for the right opportunity... and then you reach out and accidentally grab some dirt instead. Bummer. The locust was too fast for you. Maybe next time. \n\n+1 Handful of Dirt",
        actions: []
    },
    "lookBronzeSerpent":{        
        title: "Look at the Bronze Serpent",
        id: "lookBronzeSerpent",
        encounterRate: 1,
        description: "Would you like to be healed?",
        actions: [{
            name: "Be Healed",
            actionType: "setCharCondition",
            func: (gameState, event, setCurrentEvent) => {
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.hp = 100;
                    }));
                    setCurrentEvent("finishLookBronzeSerpent");
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
            func: (gameState, event, setCurrentEvent) => {
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.spiritualHp = 100;
                    }));
                    setCurrentEvent("finishSleepOnStone");
            }
        }]
    },
    "finishSleepOnStone":{        
        title: "Sleep on the Stone",
        id: "finishSleepOnStone",
        encounterRate: 1,
        description: "You have a dream, and behold, you see a ladder set up on the earth, with the top of it reaching to heaven. And behold, you see the angels of God ascending and descending on it!\n\nYou wake up with wonder and think, \"Surely the Lord is in this place, and I did not know it.\"\n\nYour Spiritual HP is back to full!",
        actions: []
    },
    "theLostMan": {
        title: "The Lost Man",
        id: "theLostMan",
        encounterRate: 1,
        description: "You ask him what\'s going on.\n\n\"I\'m not sure,\" he says, \"Someone told me that there was this magical place called Eden out here, where nothing is cursed and everything is living. It didn\'t seem possible, but something inside of me told me to go look for it. So I went out to find it, and now I\'m completely lost. I have no idea where I am.\"\n\n\"Where did you come from?\" you ask.\n\n\"I live in the Land of the Patriarchs. But I don\'t know how to get there. I don\'t really have a sense of direction.\"",
        quests: [{
            id: "senseOfDirection",
            action: "start",
        }],
        actions: [],
    }
}
