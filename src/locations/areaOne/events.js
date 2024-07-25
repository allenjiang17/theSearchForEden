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
    
    /*Table of Contents

    - beginning event
    - your house events
    - cistern events
    - fig leaf events
    - travelling prophetess events
    - babbler events
    - deceiver events
    - merchant events
    - crafty sir penn: quest events
    - crafty sir penn: shop events
    - wilderness events
    - future events that haven't been implemented yet

    */

    //beginning event

    "beginnings": {
        title: "Beginnings",
        id: "beginnings",
        encounterRate: 1,
        description: "You wake up, and you feel strange. Something like scales falls from your eyes, and it is as if you can see for the first time. Everything that felt familiar to you now feels distant.\n\nYour thinking still feels futile, and your foolish heart still feels darkened. But you have this sense that eternity has been set on your heart. And it calls to you to go from your country, your people, and your father’s household, and to a new land.",
        actions: [{
            name: "Begin your adventure",
            actionType: "setLocation",
            func: (gameState) => {
                gameState.setLocation("house");
            }
        }]
    },

    //your house events

    "nightRest": {
        title: "",
        id: "nightRest",
        encounterRate: 1,
        description: "",
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
                    setCurrentEvent("finishPrayCloset");
            }
        }]
    },
    "finishPrayCloset":{        
        title: "Pray",
        id: "finishPrayCloset",
        encounterRate: 1,
        description: "You feel that your Father sees what you are doing in secret, and he rewards you. Your Spiritual HP is back to full!",
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
        description: "You searched carefully and found a lost coin! You call your friends and neighbors together and say, \"Rejoice with me; I have found my lost coin.\"\n\n(+1 Earthly Coin)",
        actions: []
    },
    "nothingFoundBedroom":{
        title: "Nothing found",
        id: "nothingFoundBedroom",
        encounterRate: 1, 
        description: "You searched carefully but did not find anything. Maybe next time.",
        actions: []
    },

    // cistern events

    "getWaterFromCistern":{
        title: "Get Water from Cistern",
        id: "getWaterFromCistern",
        encounterRate: 1, 
        description: "Would you like to gather some water?",
        actions: [{
            name: "Gather Water",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                if (gameState.inventory.items["bucket"] >= 1) {
                    gameState.setInventory(produce((newInventory)=>{
                        updateInventory(newInventory, "dyingWater");
                    }));
                    setCurrentEvent("getWaterFromCisternComplete")
                } else {
                    setCurrentEvent("getWaterFromCisternNoBucket");  
                }
        }}]
    },
    "getWaterFromCisternComplete":{
        title: "Get Water from Cistern - Complete",
        id: "getWaterFromCisternComplete",
        encounterRate: 1, 
        description: "You lower your bucket into the broken cistern and manage to get a little bit of the water at the bottom.\n\n+1 Dying Water",
        actions: []
    },
    "getWaterFromCisternNoBucket":{
        title: "Can't Get the Water",
        id: "getWaterFromCisternNoBucket",
        encounterRate: 1, 
        description: "You try to reach the water at the bottom of the cistern, but it\'s too deep. If only you had something to draw the water with.",
        actions: []
    },

    // fig leaf events

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

    //travelling prophetess events
    
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
                    gameState.setMap(produce((newMap)=>{
                        newMap["travelingProphetess"].unlocked = false;
                    }));       
            }
        },
        actions: []
    },

    // babbler events

    "babbleWithBabbler": {
        title: "Babble with the Babbler",
        id: "babbleWithBabbler",
        encounterRate: 1,
        description: "\"I know all of the secrets of everybody in this town. Tell you what--if you give me something of use, I'll tell you some hot gossip.\"\n\n\"Okay, maybe,\" you say, \"What can you use?\"\n\n\"Hmm... well I am pretty hungry. Can you get me some Bread of Idleness?\"",
        actions: [{
            name: "Give Bread of Idleness",
                actionType: "setInventory",
                func: (gameState, event, setCurrentEvent) => {
                    
                    if (gameState.inventory.items["breadOfIdleness"] >= 1) {
                        gameState.setInventory(produce((newInventory)=>{
                            newInventory.items["breadOfIdleness"] = newInventory.items["breadOfIdleness"] - 1; 
                        }));
                        if (Math.random() > 0.7) {
                            setCurrentEvent("babbleWithBabbler3");
                        } else if (Math.random() > 0.5) {
                            setCurrentEvent("babbleWithBabbler4");
                        } else {
                            setCurrentEvent("babbleWithBabbler5");
                        }
                    } else {
                        setCurrentEvent("talkWithBabblerNoBread");
                    }
                }   
            }
        ]
    },
    "babbleWithBabbler3":{
        title: "Babble with Babbler 4",
        encounterRate: 1, 
        description: 'Have you met the traveling prophetess yet? If you visit the town square on the right days, you\'ll be able to meet her. On other days, she\'s traveling around in other places around the world.\n\n(-5 Spiritual HP)',
        autoAction: [{
            name: "Talk with Babbler 3",
            actionType: "setCharCondition",
            func: (gameState, event, setCurrentEvent) => {
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.spiritualHp = Math.max(0,newCharCondition.spiritualHp - 5);
                    }));
                }
            }
        ]
    },
    "babbleWithBabbler4":{
        title: "Babble with Babbler 4",
        id: "babbleWithBabbler4",
        encounterRate: 1, 
        description: 'Did you hear the legend of the powerful sorceror? I heard he once turned his staff into a serpent. Or did he turn his serpent into a staff? I forget.\n\n(-5 Spiritual HP)',
        autoAction: [{
            name: "Talk with Babbler 4",
            actionType: "setCharCondition",
            func: (gameState, event, setCurrentEvent) => {
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.spiritualHp = Math.max(0,newCharCondition.spiritualHp - 5);
                    }));
                }
            }
        ]
    },
    "babbleWithBabbler5":{
        title: "Babble with Babbler 5",
        id: "babbleWithBabbler5",
        encounterRate: 1, 
        description: '\"A traveler once told me that he faced a terrifying spirit of fear in this place called Yam Suph, located in the wilderness. I asked him where it was, but he was too afraid to say. But he did draw this map for me.\"\n\nThe babbler pulls a crinkled map out of his coat pocket. \"You know what? I don\'t really need this map anymore. Why don\'t you have it?\"\n\n(-5 Spiritual HP) (+1 Map to Yam Suph)',
        autoAction: [{
            name: "Talk with Babbler 5",
            actionType: "setCharCondition",
            func: (gameState, event, setCurrentEvent) => {
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.spiritualHp = Math.max(0,newCharCondition.spiritualHp - 5);
                    }));
                    gameState.setMap(produce((newMap)=>{
                        newMap["yamSuph"].unlocked = true;
                    }));
                    }
                
            }
        ]
    },
    "talkWithBabblerNoBread":{
        title: "Talk with Babbler No Bread",
        id: "talkWithBabblerNoBread",
        encounterRate: 1, 
        description: '\"Uh... you don\'t have any bread. Go get some first if you want to talk to me.\"',
        autoAction: {
            name: "Talk with Babbler 1",
            actionType: "setCharCondition",
            func: (gameState, event, setCurrentEvent) => {
                if (gameState.inventory.items["breadOfIdleness"] >= 1) {
                    setCurrentEvent("babbleWithBabbler")
                }
            }
        },
        actions: [],
    },

    // deceiver events
    
    "chatWithDeceiver": {
        title: "Chat with the Wicked Deceiver",
        id: "chatWithDeceiver",
        encounterRate:1,
        description: "\"Hi there, what are you up to?\" you ask.\n\n\"Oh, you wouldn\'t want to know,\" the Wicked Deceiver says, \"You don\'t seem to be the type of person who would want what I have.\"\n\n\"Well, what do you have?\" you ask.\n\nThe Deceiver studies you for a moment, and then says, \"The Land of the Judges is flowing with magical milk and honey. If you drink of it, all your ailments will disappear forever. Do you believe me?\"\n\n\"I\'m not sure,\" you say.\n\n\"Well, I just happen to have some on me. If you\'d like some, I\'ll give you a bucket full of this magical milk and honey for 5 coins. What do you think?\"",
        actions: [{
            name: "Trade 5 Earthly Coins for Milk and Honey",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                if (gameState.inventory.money < 5) 
                    {
                    setCurrentEvent("chatWithDeceiverNoMoney");                        
                } else if (!gameState.inventory.items["bucket"] || gameState.inventory.items["bucket"] < 1) {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.money -= 5;
                        updateInventory(newInventory, "bucket");
                    }));
                    setCurrentEvent("chatWithDeceiver2");
                } else {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.money -= 5;
                    }));
                    setCurrentEvent("chatWithDeceiver3");
                }
            } 
            }
        ]
    },
    "chatWithDeceiver2":{
        title: "Talk with Deceiver 2",
        id: "chatWithDeceiver2",
        encounterRate: 1, 
        description: 'The deceiver takes your coins and sneakily hands you a bucket. You look inside the bucket and see that it\'s empty.\n\n\"Um, this bucket is empty,\" you tell the Deceiver.\n\n\"Is that so?\" the Deceiver says, \"That\'s odd. It was full of milk and honey when I handed it to you.\"\n\nLooks like you got deceived. Oh well. At least you have an empty bucket.\n\n(+1 Bucket)',
        actions: [],
    }, 
    "chatWithDeceiver3":{
        title: "Talk with Deceiver 3",
        id: "chatWithDeceiver3",
        encounterRate: 1, 
        description: 'The deceiver takes your coins and sneakily hands you nothing. You look inside your nothing and see nothing.\n\n\"Um, you didn\'t give me anything at all,\" you tell the Deceiver.\n\n\"Is that so?\" the Deceiver says, \"That\'s odd. It was definitely something when I handed it to you.\"\n\nLooks like you got deceived again.',
        actions: [],
    },   
    "chatWithDeceiverNoMoney":{
        title: "No Money",
        id: "chatWithDeceiverNoMoney",
        encounterRate: 1, 
        description: "You don't have enough coins.",
        actions: []
    },

    // merchant events
        
    "chatWithMerchant": {
        title: "Chat with Dishonest Merchant",
        id: "chatWithMerchant",
        encounterRate: 1, 
        description: "\"Greetings, I am on the search for some items. Here\'s what I am looking for and how much I am willing to pay for them. Are you willing to make an offer?",
        actions: [{
            name: "Bread of Idleness:\n2 coins",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                if (!gameState.inventory.items["breadOfIdleness"] || gameState.inventory.items["breadOfIdleness"] < 1) {
                    setCurrentEvent("dishonestMerchantFailure");
                } else {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.money += 1;
                        newInventory.items["breadOfIdleness"] -= 1; 
                    }));
                    setCurrentEvent("sellBreadOfIdleness");
                }
            }
        },
        {
            name: "Ex-stone Bread:\n3 coins",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                if (!gameState.inventory.items["exStoneBread"] || gameState.inventory.items["exStoneBread"] < 1) {
                    setCurrentEvent("dishonestMerchantFailure");
                } else {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.money += 2;
                        newInventory.items["exStoneBread"] -= 1; 
                    }));
                    setCurrentEvent("sellExStoneBread");
                }
            }
        },
        {
            name: "Literal Quail:\n3 coins",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                if (!gameState.inventory.items["literalQuail"] || gameState.inventory.items["literalQuail"] < 1) {
                    setCurrentEvent("dishonestMerchantFailure");
                } else {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.money += 2;
                        newInventory.items["literalQuail"] -= 1; 
                    }));
                    setCurrentEvent("sellLiteralQuail");
                }
            }
        },
        {
            name: "Locust:\n3 coins",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                if (!gameState.inventory.items["locust"] || gameState.inventory.items["locust"] < 1) {
                    setCurrentEvent("dishonestMerchantFailure");
                } else {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.money += 2;
                        newInventory.items["locust"] -= 1; 
                    }));
                    setCurrentEvent("sellLocust");
                }
            }
        },
        {
            name: "Water of Meribah:\n3 coins",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                if (!gameState.inventory.items["waterOfMeribah"] || gameState.inventory.items["waterOfMeribah"] < 1) {
                    setCurrentEvent("dishonestMerchantFailure");
                } else {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.money += 2;
                        newInventory.items["waterOfMeribah"] -= 1; 
                    }));
                    setCurrentEvent("sellWaterOfMeribah");
                }
            }
        },
        {
            name: "Manna:\n5 coins",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                if (!gameState.inventory.items["manna"] || gameState.inventory.items["manna"] < 1) {
                    setCurrentEvent("dishonestMerchantFailure");
                } else {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.money += 4;
                        newInventory.items["manna"] -= 1; 
                    }));
                    setCurrentEvent("sellManna");
                }
            }
        },
        {
            name: "Sense of Direction:\n5 coins",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                if (!gameState.inventory.items["senseOfDirection"] || gameState.inventory.items["senseOfDirection"] < 1) {
                    setCurrentEvent("dishonestMerchantFailure");
                } else {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.money += 4;
                        newInventory.items["senseOfDirection"] -= 1; 
                    }));
                    setCurrentEvent("sellSenseOfDirection");
                }
            }
        }
    ]
    },
    "sellBreadOfIdleness":{
        title: "Sell Bread of Idleness",
        id: "sellBreadOfIdleness",
        encounterRate: 1, 
        description: "You hand over a Bread of Idleness, and the Dishonest Merchant gives you 1 coin. \"Great doing business with you,\" he says.\n\n\"Wait,\" you protest, \"I thought you said you would give me 2 coins for this.\"\n\n\"Did I really?\" the Dishonest Merchant asks, \"I am pretty sure I said I would only offer 1. Either way, your Bread of Idleness is the wrong color. It\'s only worth 1.\"\n\nLooks like you were played.\n\n+1 Earthly Coin",
        actions: []
    },
    "sellExStoneBread":{
        title: "Sell Ex-stone Bread",
        id: "sellExStoneBread",
        encounterRate: 1, 
        description: "You hand over an Ex-stone Bread, and the Dishonest Merchant gives you 2 coins. \"Great doing business with you,\" he says.\n\n\"Wait,\" you protest, \"I thought you said you would give me 3 coins for this.\"\n\n\"Did I really?\" the Dishonest Merchant asks, \"I am pretty sure I said I would only offer 2. Either way, your Ex-stone Bread is too tough to chew. It\'s only worth 2.\"\n\nLooks like you were played.\n\n+2 Earthly Coins",
        actions: []
    },
    "sellLiteralQuail":{
        title: "Sell Literal Quail",
        id: "sellLiteralQuail",
        encounterRate: 1, 
        description: "You hand over a Literal Quail, and the Dishonest Merchant gives you 2 coins. \"Great doing business with you,\" he says.\n\n\"Wait,\" you protest, \"I thought you said you would give me 3 coins for this.\"\n\n\"Did I really?\" the Dishonest Merchant asks, \"I am pretty sure I said I would only offer 2. Either way, your Literal Quail has too many feathers on it. It\'s only worth 2.\"\n\nLooks like you were played.\n\n+2 Earthly Coins",
        actions: []
    },
    "sellLocust":{
        title: "Sell Locust",
        id: "sellLocust",
        encounterRate: 1,
        description: "You hand over a Locust, and the Dishonest Merchant gives you 2 coins. \"Great doing business with you,\" he says.\n\n\"Wait,\" you protest, \"I thought you said you would give me 3 coins for this.\"\n\n\"Did I really?\" the Dishonest Merchant asks, \"I am pretty sure I said I would only offer 2. Either way, your Locust jumps too much. It\'s only worth 2.\"\n\nLooks like you were played.\n\n+2 Earthly Coins",
        actions: []
    },
    "sellWaterOfMeribah":{
        title: "Sell Water of Meribah",
        id: "sellWaterOfMeribah",
        encounterRate: 1,
        description: "You hand over a Water of Meribah, and the Dishonest Merchant gives you 2 coins. \"Great doing business with you,\" he says.\n\n\"Wait,\" you protest, \"I thought you said you would give me 3 coins for this.\"\n\n\"Did I really?\" the Dishonest Merchant asks, \"I am pretty sure I said I would only offer 2. Either way, your Water of Meribah is too wet. It\'s only worth 2.\"\n\nLooks like you were played.\n\n+2 Earthly Coins",
        actions: []
    },
    "sellManna":{
        title: "Sell Manna",
        id: "sellManna",
        encounterRate: 1,
        description: "You hand over some Manna, and the Dishonest Merchant gives you 4 coins. \"Great doing business with you,\" he says.\n\n\"Wait,\" you protest, \"I thought you said you would give me 5 coins for this.\"\n\n\"Did I really?\" the Dishonest Merchant asks, \"I am pretty sure I said I would only offer 4. Either way, your Manna is too sweet. It\'s only worth 4.\"\n\nLooks like you were played.\n\n+4 Earthly Coins",
        actions: []
    },
    "sellSenseOfDirection":{
        title: "Sell Sense of Direction",
        id: "sellSenseOfDirection",
        encounterRate: 1,
        description: "You hand over a Sense of Direction, and the Dishonest Merchant gives you 4 coins. \"Great doing business with you,\" he says.\n\n\"Wait,\" you protest, \"I thought you said you would give me 5 coins for this.\"\n\n\"Did I really?\" the Dishonest Merchant asks, \"I am pretty sure I said I would only offer 4. Either way, your Sense of Direction is too abstract of a concept. I can\'t even tell what I\'m looking at. It\'s only worth 4 coins.\"\n\nLooks like you were played.\n\n+4 Earthly Coins",
        actions: []
    },
    "dishonestMerchantFailure":{
        title: "You Don't Have That",
        id: "dishonestMerchantFailure",
        encounterRate: 1, 
        description: "\"You don\'t even have that! Are you trying to beat me in my own game?\"\n\nYou lose 5 Spiritual HP for being dishonest.",
        autoAction: {
            name: "Being Dishonest",
            actionType: "setCharCondition",
            func: (gameState, event, setCurrentEvent) => {
                gameState.setCharCondition(produce((newCharCondition)=>{
                    newCharCondition.spiritualHp = Math.max(0,newCharCondition.spiritualHp - 5);
                }));
                setCurrentEvent("chatWithMerchant")
            }
        }
    },

    //crafty sir penn: quest events

    "getSomeClothes":{
        title: "Get Some Clothes",
        id: "getSomeClothes",
        encounterRate: 1, 
        description: '\"Whoa! Whoa! You can\'t walk in here without clothes! What in the world are you thinking?\"\n\n\"I am so sorry,\" you say with embarrassment, \"I didn\'t realize.\" You feel naked and ashamed.\n\n\“Well, it seems like today is your lucky day,\” the Crafty Sir Penn says. \“I can help you out. If you get me 10 fig leaves and pay me 2 earthly coins, I\'ll make you something to wear.\"\n\nYou stare at him with skepticism. \"Is your word trustworthy? To be honest, it\'s hard for me to trust somebody named \'the Crafty Sir Penn.\'\"\n\n\"Oh, that\'s just a misunderstanding. People call me crafty because I\'m good at crafting things.\" \n\n"I see,\" you quietly say, as you walk out of the room.',
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
            }
        },
    },
    "getSomeClothesIncomplete":{
        title: "Get Some Clothes Incomplete",
        id: "getSomeClothesIncomplete",
        encounterRate: 1, 
        description: 'The Crafty Sir Penn looks up from his workbench. \n\n“Do you have 10 fig leaves and 2 earthly coins yet? No? Then come back when you get them.”',
        actions: []
    },
    "getSomeClothesCompleteStep1":{
        title: "Get Some Clothes Complete",
        id: "getSomeClothesCompleteStep1",
        encounterRate: 1, 
        description: 'The Crafty Sir Penn looks up from his workbench. “You got the stuff? Good. Give them here”',
        actions: [{
            name: "Give 10 Fig Leaves and 2 Earthly Coins",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.money = Math.max(0, newInventory.money - 2);
                        newInventory.items["figLeaf"] = Math.max(0, newInventory.items["figLeaf"] - 10); 
                    }));
                    setCurrentEvent("getSomeClothesCompleteStep2");
                    gameState.setMap(produce((map)=>{map[gameState.location].currentEvent = "getSomeClothesCompleteStep2"}));

            }
        }]
    },   
    "getSomeClothesCompleteStep2":{
        title: "Get Some Clothes Complete Step 2",
        id: "getSomeClothesCompleteStep2",
        encounterRate: 1, 
        description: "\"Great,\" the Crafty Sir Penn says.\n\nYou watch him work his magic. In a few moments, he presents to you a Fig Leaf Loincloth! \n\n\"Here you go.\" \n\n(+1 Fig Leaf Loincloth)",
        quests: [{
            id: "getSomeClothes",
            action: "complete",
        }],
        autoAction: {
            name: "Gain Fig Leaf Loincloth",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {

                    if (gameState.quests["getSomeClothes"].progress !== "complete") {

                        gameState.setInventory(produce((newInventory)=>{
                            newInventory.equipment.push("figLeafLoincloth");
                        }));

                    } else {
                        setCurrentEvent("getSomeBetterClothes");
                        gameState.setMap(produce((map)=>{map[gameState.location].currentEvent = "getSomeBetterClothes"}));
                    }
            }
        },
        actions: []
    },
    "getSomeBetterClothes":{
        title: "Get Some Better Clothes",
        id: "getSomeBetterClothes",
        encounterRate: 1, 
        description: '\"Good, I see you are not naked today. How are you liking your fig leaves?\" the Crafty Sir Penn asks.\n\n"They\'re not bad,\" you say, \"but they don\'t cover a whole lot of my body.\"\n\n"Well, what do you expect? You only gave me 10 leaves."\n\n\"Yes, I understand. But I wonder--is there anything else that you can make that can boost my defense a bit more?\"\n\n\"Of course! They don\'t call me the Crafty Sir Penn for no reason. I\'ll tell you what--give me 6 garments, and I\'ll make you something. This one will cost you 4 Earthly Coins though.',
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
                    if (gameState.inventory.items["chewedUpGarments"] >= 6 && gameState.inventory.money >= 4) {
                        setCurrentEvent("getSomeBetterClothesCompleteStep1");

                    } else {
                        setCurrentEvent("getSomeBetterClothesIncomplete");
                    }
                }
            }
        },
        actions: []
    },
    "getSomeBetterClothesIncomplete":{
        title: "Get Some Better Clothes Incomplete",
        id: "getSomeBetterClothesIncomplete",
        encounterRate: 1, 
        description: 'The Crafty Sir Penn looks up from his workbench. \n\n“Do you have 6 garment pieces and 4 Earthly Coins yet? No? Then come back when you get them.”',
        actions: []
    },
    "getSomeBetterClothesCompleteStep1":{
        title: "Get Some Better Clothes Complete",
        id: "getSomeBetterClothesCompleteStep1",
        encounterRate: 1, 
        description: 'The Crafty Sir Penn looks up from his workbench. “You got the stuff? Good. Give them here”',
        actions: [{
            name: "Give 6 Chewed-up Garments and 4 Earthly Coins",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.money = Math.max(0, newInventory.money - 4);
                        newInventory.items["chewedUpGarments"] = Math.max(0, newInventory.items["chewedUpGarments"] - 6); 
                    }));
                    setCurrentEvent("getSomeBetterClothesCompleteStep2");
                    gameState.setMap(produce((map)=>{map[gameState.location].currentEvent = "getSomeBetterClothesCompleteStep2"}));

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

                    if (gameState.quests["getSomeBetterClothes"].progress !== "complete") {
                        gameState.setInventory(produce((newInventory)=>{
                            newInventory.equipment.push("garmentOfSkin");
                        }));
                        
                    } else {
                        setCurrentEvent("craftySirPennShop");
                        gameState.setMap(produce((map)=>{map[gameState.location].currentEvent = "craftySirPennShop"}));
                    }
                }
        },
        actions: []
    },


    //crafty sir penn: shop events

    "craftySirPennShop": {
        title: "Crafty Sir Penn Shop",
        id: "craftySirPennShop",
        encounterRate: 1, 
        description: "The Crafty Sir Penn looks up from his workbench and says, \"Good to see you are not naked today. What are you interested in?\"",
        actions: [{
            name: "Rope",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("getRope");
            }
        },
        {
            name: "Garment of Camel's Hair",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("getCamelsHairGarment");
            }
        },
        {
            name: "Serpent Scales Armor",
            func: (gameState, event ,setCurrentEvent) => {
                    setCurrentEvent("getSerpentScalesArmor");
            }
        },
        {
            name: "Serpent Taxidermy",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("getSerpentTaxidermy");
            }
        }
    ]
    },
    "getRope":{
        title: "Get Rope",
        id: "getRope",
        encounterRate: 1, 
        description: "Ah--rope, such a versatile tool. I can make rope from camel\'s hair. If you get me 2 bunches of camel\'s hair and 2 earthly coins, I\'ll make you some.",
        actions: [{
            name: "Exchange Stuff for Rope",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                if (gameState.inventory.items["camelHair"] >= 2 && gameState.inventory.money >= 2) {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.money = Math.max(0, newInventory.money - 2);
                        newInventory.items["camelHair"] = Math.max(0, newInventory.items["camelHair"] - 2); 
                    }));
                    setCurrentEvent("getRopeSuccess");
                } else {
                    setCurrentEvent("craftySirPennShopFailure")
                }
            }
        }]
    },
    "getRopeSuccess":{
        title: "Get Rope Success",
        id: "getRopeSuccess",
        encounterRate: 1, 
        description: "You give the Crafty Sir Penn 2 Bunches of Camel's Hair and 2 Earthly Coins. In a few moments, he presents you with a rope.\n\n\"I must warn you though,\" he says, \"It isn\'t the sturdiest quality.\"\n\n(+1 Rope)",
        autoAction: {
            name: "Get Rope",
            actionType: "setInventory",
            func: (gameState) => {
                updateInventory(newInventory, "rope");    
            }
        },
        actions: []
    },
    "getCamelsHairGarment":{
        title: "Get Garment of Camel's Hair",
        id: "getRope",
        encounterRate: 1, 
        description: "\"So you want a garment of camel's hair? I must tell you--it doesn\'t do much in terms of physical protection. But if you really want it, I\'ll make it for you. It will cost you 5 bunches of camel\'s hair and 5 earthly coins.\"",
        actions: [{
            name: "Exchange Stuff for Garment of Camel\'s Hair",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                if (gameState.inventory.items["camelHair"] >= 5 && gameState.inventory.money >= 5) {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.money = Math.max(0, newInventory.money - 5);
                        newInventory.items["camelHair"] = Math.max(0, newInventory.items["camelHair"] - 5); 
                    }));
                    setCurrentEvent("getCamelsHairGarmentSuccess");
                } else {
                    setCurrentEvent("craftySirPennShopFailure")
                }
            }
        }]
    },
    "getCamelsHairGarmentSuccess":{
        title: "Get Camel's Hair Garment Success",
        id: "getCamelsHairGarmentSuccess",
        encounterRate: 1, 
        description: "You give the Crafty Sir Penn 5 Bunches of Camel's Hair and 5 Earthly Coins. In a few moments, he presents you with a garment of camel\'s hair.\n\n(+1 Garment of Camel\'s Hair)",
        name: "Get Garment of Camel\'s Hair",
        autoAction: {
            actionType: "setInventory",
            func: (gameState) => {
                gameState.setInventory(produce((newInventory)=>{
                    newInventory.equipment.push("garmentOfCamelsHair");
                }));
            }
        },
        actions: []
    },
    "getSerpentScalesArmor":{
        title: "Get Serpent Scales Armor",
        id: "getSerpentScalesArmor",
        encounterRate: 1, 
        description: "\"Serpent Scales Armor--that\'s a proper thing for a warrior like yourself to wear. This will cost 5 sets of serpent skin and 10 earthly coins.\"",
        actions: [{
            name: "Exchange Stuff for Serpent Scales Armor",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                if (gameState.inventory.items["serpentSkin"] >= 5 && gameState.inventory.money >= 10) {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.money = Math.max(0, newInventory.money - 10);
                        newInventory.items["serpentSkin"] = Math.max(0, newInventory.items["serpentSkin"] - 5); 
                    }));
                    setCurrentEvent("getSerpentScalesArmorSuccess");
                } else {
                    setCurrentEvent("craftySirPennShopFailure")
                }
            }
        }]
    },
    "getSerpentScalesArmorSuccess":{
        title: "Get Serpent Scales Armor Success",
        id: "getSerpentScalesArmorSuccess",
        encounterRate: 1, 
        description: "You give the Crafty Sir Penn 5 Sets of Serpent Skin and 10 Earthly Coins. In a few moments, he presents you with a serpent scales armor.\n\n(+1 Serpent Scales Armor)",
        name: "Get Serpent Scales Armor",
        autoAction: {
            actionType: "setInventory",
            func: (gameState) => {
                gameState.setInventory(produce((newInventory)=>{
                    newInventory.equipment.push("serpentScalesArmor");
                }));
            }
        },
        actions: []
    },
    "getSerpentTaxidermy":{
        title: "Get Serpent Taxidermy",
        id: "getSerpentTaxidermy",
        encounterRate: 1, 
        description: "\"Finally! In all my years, I have been waiting for someone to order a Serpent Taxidermy. Taxidermy is my specialty, you know. The thing is--nobody here seems to appreciate the art.\"\n\nThis will cost 1 set of serpent skin, 1 set of serpent teeth, 1 set of serpent guts, and 1 pair of serpent eyes. I\'ll make it for you for 10 earthly coins.",
        actions: [{
            name: "Exchange Stuff for Serpent Taxidermy",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                if (gameState.inventory.items["serpentSkin"] >= 1 && gameState.inventory.items["serpentTeeth"] >= 1 && gameState.inventory.items["serpentGuts"] >= 1 && gameState.inventory.items["serpentEyes"] >= 1 && gameState.inventory.money >= 10) {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.money -= 10;
                        newInventory.items["serpentSkin"] -= 1; 
                        newInventory.items["serpentTeeth"] -= 1; 
                        newInventory.items["serpentGuts"] -= 1; 
                        newInventory.items["serpentEyes"] -= 1; 
                    }));      
                    setCurrentEvent("getSerpentTaxidermySuccess");
                } else {
                    setCurrentEvent("craftySirPennShopFailure")
                }
            }
        }]
    },
    "getSerpentTaxidermySuccess":{
        title: "Get Serpent Taxidermy Success",
        id: "getSerpentTaxidermySuccess",
        encounterRate: 1, 
        description: "You give the Crafty Sir Penn the necessary serpent body parts, and in a few moments, he presents you with a serpent taxidermy.\n\n(+1 Serpent Taxidermy)",
        name: "Get Serpent Taxidermy",
        actions: {
            name: "Continue",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                gameState.setInventory(produce((newInventory)=>{
                    updateInventory(newInventory, "serpentTaxidermy");
                    setCurrentEvent("getSerpentTaxidermySuccess2")
                }));  
            }
        },
    },
    "getSerpentTaxidermySuccess2":{
        title: "Get Serpent Taxidermy Success 2",
        id: "getSerpentTaxidermySuccess2",
        encounterRate: 1, 
        description: "You feel a strange sense of attachment to your new taxidermy. And it beckons you to go into the wilderness.",
        name: "Get Serpent Taxidermy",
        autoAction: {
            actionType: "setMap",
            func: (gameState, event, setCurrentEvent) => {
                gameState.setMap(produce((newMap)=>{
                    newMap["burningBush"].unlocked = true;
                }));  
            }
        },
        actions: []
    },
    "craftySirPennShopFailure": {
        title: "Crafty Sir Penn Shop Failure",
        id: "craftySirPennShopFailure",
        encounterRate: 1, 
        description: "The old man looks at you with disapproval. You clearly don't have the stuff.",
        actions: []
    },

    // wilderness events

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
        encounterRate: 0.6, 
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
    "getCamelHair":{
        title: "Get Camel Hair",
        id: "getCamelHair",
        encounterRate: 0.8, 
        description: "You come across a wild camel sleeping in the sun. Do you want to try to grab some camel\'s hair?",
        actions: [{
            name: "Grab Some Camel Hair",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                if (Math.random() < 0.5) {
                    gameState.setInventory(produce((newInventory)=>{
                        updateInventory(newInventory, "camelHair");
                    }));
                    setCurrentEvent("getCamelHairSuccess");
                } else {
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.hp = Math.max(0,newCharCondition.hp - 10);
                    }));
                    setCurrentEvent("getCamelHairFailure");

                }
        }
        }]
    },
    "getCamelHairSuccess":{
        title: "You get some camel hair!",
        id: "getCamelHairSuccess",
        encounterRate: 1, 
        description: "You quietly sneak up on the camel, grab some hair in your hands, and give it a pull. Bingo! You have a fistful of hair, and the camel didn\'t even notice. \n\n+1 Bunch of Camel\'s Hair",
        actions: []
    },
    "getCamelHairFailure":{
        title: "You couldn't get the camel hair.",
        id: "getCamelHairFailure",
        encounterRate: 1, 
        description: "You quietly sneak up on the camel and try to grab some hair in your hands, but then the camel suddenly gets up and kicks its hind legs backward. OW! You leave with nothing but a bruise.\n\n-10 Physical HP",
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
    "approachBurningBush":{        
        title: "Approach the Burning Bush",
        id: "approachBurningBush",
        encounterRate: 1,
        description: "What would you like to do?",
        actions: [{
            name: "Approach the Burning Bush",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                if (!gameState.inventory.items["serpentTaxidermy"] || gameState.inventory.items["serpentTaxidermy"] < 1) {
                    setCurrentEvent("approachBurningBushNothing");
                } else {
                    setCurrentEvent("approachBurningBush2");
                }
            }
        }]
    },
    "approachBurningBush2":{        
        title: "Approach the Burning Bush 2",
        id: "approachBurningBush2",
        encounterRate: 1,
        description: "You cautiously walk toward the burning bush, and then all of a sudden you feel something wriggling in your bag of stuff. You open your bag to take a look, and a serpent jumps out of the bag!\n\nIt\'s your serpent taxidermy, except it has come alive! The serpent slithers on the ground in a fit of madness, turns to you, and shrieks. You are filled with horror.",
        actions: [{
            name: "Grab the Serpent by the Tail",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                gameState.setInventory(produce((newInventory)=>{
                    newInventory.items["serpentTaxidermy"] -= 1; 
                    newInventory.weapons.push("staffOfMoses");
                }));
                setCurrentEvent("approachBurningBushTail");
                }
            },
            {
            name: "Grab the Serpent by the Head",
            actionType: "setCharCondition",
            func: (gameState, event, setCurrentEvent) => {
                gameState.setCharCondition(produce((newCharCondition)=>{
                    newCharCondition.hp -= 10;
                }));
                setCurrentEvent("approachBurningBushHead");
                }
            },
            {
            name: "Run Away",
            actionType: "setCharCondition",
            func: (gameState, event, setCurrentEvent) => {
                gameState.setCharCondition(produce((newCharCondition)=>{
                    newCharCondition.spiritualHp =  Math.max(0,newCharCondition.spiritualHp - 10);
                }));
                gameState.setInventory(produce((newInventory)=>{
                    newInventory.items["serpentTaxidermy"] -= 1; 
                }));
                setCurrentEvent("approachBurningBushRun");
                }
            }
        ]
    },
    "approachBurningBushTail":{        
        title: "Grab the Serpent's Tail",
        id: "approachBurningBushTail",
        encounterRate: 1,
        description: "You courageously grab the serpent by its tail, bracing yourself for what might happen next. But then the serpent suddenly freezes up, and it gradually morphs into an old wooden staff.\n\nAs you curiously examine the staff, you sense a great power that lies within it. It fills you with a holy courage unlike anything you\'ve ever experienced, and you feel braver than you\'ve ever been before.\n\n+1 Staff of Moses",
        actions: []
    }, 
    "approachBurningBushHead":{        
        title: "Grab the Serpent's Tail",
        id: "approachBurningBushTail",
        encounterRate: 1,
        description: "You courageously grab the serpent by its head, bracing yourself for what might happen next. Horrible choice. The serpent sinks its fangs into your hand.\n\n\"YOWEEEEE!\" you exclaim.\n\n-10 Physical HP",
        actions: [{
            name: "Grab the Serpent by the Tail",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                gameState.setInventory(produce((newInventory)=>{
                    newInventory.items["serpentTaxidermy"] -= 1; 
                    newInventory.weapons.push("staffOfMoses");
                }));
                setCurrentEvent("approachBurningBushTail");
                }
            },
            {
            name: "Run Away",
            actionType: "setCharCondition",
            func: (gameState, event, setCurrentEvent) => {
                gameState.setCharCondition(produce((newCharCondition)=>{
                    newCharCondition.spiritualHp = Math.max(0,newCharCondition.spiritualHp - 10);
                }));
                setCurrentEvent("approachBurningBushRun");
                }
            }
        ]
    }, 
    "approachBurningBushRun":{        
        title: "Nothing Happens",
        id: "approachBurningBushRun",
        encounterRate: 1,
        description: "You run away like a scared little mouse. Not only have you lost your Serpent Taxidermy, but you've also lost your face, metaphorically.\n\n-10 Spiritual HP",
        actions: []
    },  
        "approachBurningBushNothing":{        
        title: "Nothing Happens",
        id: "approachBurningBushNothing",
        encounterRate: 1,
        description: "You watch the mysterious fire flicker back and forth. You wait for something extraordinary to happen, but nothing does.",
        actions: []
    },    
    /*

    commenting off the Lost Man stuff because I can't figure it out.

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
        autoAction: {
            name: "Check Inventory",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                const questState = gameState.quests["senseOfDirection"];
                if (questState && questState.progress !== "complete") {
                    if (gameState.inventory.items["senseOfDirection"] >= 1) {
                        setCurrentEvent("senseOfDirectionCompleteStep1");
                    } else {
                        setCurrentEvent("senseOfDirectionIncomplete");
                    }
                } else {
                    setCurrentEvent("nobodyIsHere");
                }
            }
        }
    },
    "nobodyIsHere":{
        title: "Nobody Is Here",
        id: "nobodyIsHere",
        encounterRate: 1, 
        description: 'Nobody is here. The lost man has been found.',
        actions: []
    },
    "senseOfDirectionIncomplete":{
        title: "Sense of Direction Incomplete",
        id: "senseOfDirectionIncomplete",
        encounterRate: 1, 
        description: 'The Lost Man is sitting in dismay in the desert sand. \"It\'s all hopeless,\" he says, \"I am so lost. I\'ll never be able to find my home.\"',
        actions: []
    },
    "senseOfDirectionCompleteStep1":{
        title: "Sense of Direction Complete",
        id: "senseOfDirectionCompleteStep1",
        encounterRate: 1, 
        description: 'The Lost Man\'s eyes light up when he sees your Sense of Direction. \"Would you please be willing to help me out with your Sense of Direction? I am in such desperate need of it.\"',
        actions: [{
            name: "Give Sense of Direction",
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                    gameState.setInventory(produce((newInventory)=>{
                        newInventory.items["senseOfDirection"] -= 1; 
                    }));
                    setCurrentEvent("senseOfDirectionCompleteStep2");
                    gameState.setMap(produce((map)=>{map[gameState.location].currentEvent = "senseOfDirectionCompleteStep2"}));

            }
        }]
    },   
    "senseOfDirectionCompleteStep2":{
        title: "Sense of Direction Complete Step 2",
        id: "senseOfDirectionCompleteStep2",
        encounterRate: 1, 
        description: "\"Thank you!\" the Formerly Lost Man says, \"Ah yes, I know exactly where I am now. And I know exactly where I live. Now I can go home!\"\n\n\"By the way, whenever you get the chance, I invite you to come pay me a visit in the Land of the Patriarchs! Here--let me write some directions on this sheet of paper.\"\n\nThe Formerly Lost Man scribbles down some notes on a piece of paper and gives it to you, and he tells you, \"If anybody ever gives you a hard time, just tell them that you are friends with the Found Man.\"\n\n+1 Map of the Land of the Patriarchs",
        quests: [{
            id: "senseOfDirection",
            action: "complete",
        }],
        autoAction: {
            name: "Quest Complete", 
            actionType: "setInventory",
            func: (gameState, event, setCurrentEvent) => {
                gameState.setInventory(produce((newInventory)=>{
                    updateInventory(newInventory, "mapPatriarchs");
                    gameState.setMap(produce((newMap)=>{
                        newMap["landOfThePatriarchs"].unlocked = true;
                        newMap["theLostMan"].unlocked = false;
                    }));
                }));
                gameState.setMap(produce((map)=>{
                    map[gameState.location].currentEvent = "nobodyIsHere";  
                }));
                }
            },

        actions: []

    },
    */

    //future events that haven't been implemented yet
    
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
    }
}
