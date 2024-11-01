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
    - valiant soldier event
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
    
    "learnFirstIncantation":{
        title: "Learn First Incantation",
        id: "learnFirstIncantation",
        encounterRate: 1, 
        description: "\"Hello there\", you say. \n\n\"Ah, yes,\" the woman says, \"You are just the one I seek.\"\n\n\"Me? Why?\"\n\n\"Because you, young sleeper, have woken up. And your journey to Eden has begun.\"\n\n\"What are you talking about?\" you ask, with bewilderment and confusion in your eyes.\n\n\"All will make sense one day. Now you know in part. One day you shall know fully, even as you are fully known.\"",
        actions: [
            {
                name: "I don\'t understand. Why were you seeking me?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("learnFirstIncantation2");
                }
            },
            {
                name: "Okay, you seem like a bit weird. Goodbye.",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("learnFirstIncantationBye");
                }
            }
    ]
    },
    "learnFirstIncantation2":{
        title: "Learn First Incantation 2",
        id: "learnFirstIncantation2",
        encounterRate: 1, 
        description: "There are two types of enemies in this world--physical enemies and spiritual enemies. It is of no use fighting spiritual enemies with physical weapons. For our struggle is not against flesh and blood, but against the rulers, against the authorities, against the powers of this dark world, and against the spiritual forces of evil in the heavenly realms.\"",
        actions: [{
                name: "So how do I fight these spiritual enemies?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("learnFirstIncantation3");
                }
            },{
                name: "Okay... I think you should go get help. See you later.",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("learnFirstIncantationBye");
                }
            }
    ]
    },
    "learnFirstIncantation3":{
        title: "Learn First Incantation 3",
        id: "learnFirstIncantation3",
        encounterRate: 1, 
        description: "\"Long ago, people fought spiritual enemies with incantations that they learned from the Scroll of Sayings. This was a scroll of powerful magic, with truths unparalleled. But alas, the scroll was lost. Do you believe this?\"",
        actions: [{
                name: "I do believe. Help my unbelief!",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("learnFirstIncantation4");
                }
            },{
                name: "Okay, this is getting a bit out of hand. I\'m going to stop talking to you right about... now. Take care.",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("learnFirstIncantationBye");
                }
            }
    ]
    },
    "learnFirstIncantation4":{
        title: "Learn First Incantation 4",
        id: "learnFirstIncantation4",
        encounterRate: 1, 
        description: "\"Yes--all you need is faith the size of a mustard seed.\"\n\n\"How big is that?\" you ask.\n\n\"It is very small,\" the lady responds, \"Anyway, although the scroll has been lost, there is still a way to defeat spiritual enemies. You see, ever since the dawn of time, holy men and women have put many parts of the scroll to memory. And they\'ve been passing those sayings down to their followers over the generations, and many of their spiritual descendants are still alive today. If you seek them out, they will be able to teach you a saying or two.\"",
        actions: [{
                name: "Where do I find these people?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("learnFirstIncantation5");
                }
            },{
                name: "That sounds like too much work. Adios!",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("learnFirstIncantationBye");
                }
            }
    ]
    },
    "learnFirstIncantation5":{
        title: "Learn First Incantation 5",
        id: "learnFirstIncantation5",
        encounterRate: 1, 
        description: "\"When the time is right, they will find you. For now, let me teach you your first incantation. Repeat after me: fight the good fight of the faith.\"",
        actions: [{
                name: "Fight the good fight of the faith.",
                func: (gameState, event, setCurrentEvent) => {
                    gameState.setCharacter(produce((newCharacter)=>{
                        newCharacter.incantations.push("basicAttack");
                    }));
                    setCurrentEvent("learnFirstIncantation6");
                }
            },{
                name: "I said BYE!",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("learnFirstIncantationBye");
                }
            }
    ]
    },
    "learnFirstIncantation6":{
        title: "Learn First Incantation 6",
        id: "learnFirstIncantation6",
        encounterRate: 1, 
        description: "\"When you are in the midst of a spiritual battle, just say that line. And believe it. Remember--all it takes is faith the size of a mustard seed.\"\n\n\"Thank you,\" you say.\n\n\"Take care. I am sure we will meet again.\"",
        actions: [],
        autoAction: {
            actionType: "setMap",
            func: (gameState, event, setCurrentEvent) => {
                    gameState.setMap(produce((newMap)=>{
                        newMap["travelingProphetess"].unlocked = false;
                    }));
                }
            }
    },
    "learnFirstIncantationBye":{
        title: "Learn First Incantation Bye",
        id: "learnFirstIncantationBye",
        encounterRate: 1, 
        description: "You walk away from the strange woman, shaking your head. \"What utter foolishness,\" you think to yourself.",
        actions: []
    },

    // valiant soldier events

    "valiantSoldierConversation":{
        title: "Talk to Valiant Soldier",
        id: "valiantSoldierConversation",
        encounterRate: 1, 
        description: "\"Stay alert, young lad! You never know who may be hiding in the shadows.\"",
        actions: [
            {
                name: "Huh? Who are you?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("valiantSoldierConversationWho");
                }
            },
            {
                name: "What are you talking about?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("valiantSoldierConversationWhat");
                }
            }
        ]
    },
    "valiantSoldierConversationWho":{
        title: "Talk to Valiant Soldier Who",
        id: "valiantSoldierConversationWho",
        encounterRate: 1, 
        description: "\"I have been a warrior since my youth. And I have slain many enemies.\"",
        actions: [
            {
                name: "Wow. I would love to be a warrior myself. Is there a thing or two you can teach me about slaying enemies?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("valiantSoldierConversationTeach");
                }
            },
            {
                name: "What sort of enemies are you talking about?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("valiantSoldierConversationEnemies");
                }
            }
        ]
    },
    "valiantSoldierConversationEnemies":{
        title: "Talk to Valiant Soldier Enemies",
        id: "valiantSoldierConversationEnemies",
        encounterRate: 1, 
        description: "\"Serpents! Lions! Warriors! If you ever encounter any, you best be ready.\"",
        actions: [
            {
                name: "What should I do when I see one?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("valiantSoldierConversationFight");
                }
            },
            {
                name: "Where do I find these enemies?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("valiantSoldierConversationFind");
                }
            }
        ]
    },
    "valiantSoldierConversationWhat":{
        title: "Talk to Valiant Soldier What",
        id: "valiantSoldierConversationWhat",
        encounterRate: 1, 
        description: "\"Enemies! Of all kinds. And they can strike you at any moment!\"",
        actions: [
            {
                name: "I see. How do I fight an enemy when I encounter one?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("valiantSoldierConversationFight");
                }
            },
            {
                name: "Where do I find these enemies?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("valiantSoldierConversationFind");
                }
            }
        ]
    },

    "valiantSoldierConversationTeach":{
        title: "Talk to Valiant Soldier Teach",
        id: "valiantSoldierConversationTeach",
        encounterRate: 1, 
        description: "\"What would you like to know, young lad?\"",
        actions: [
            {
                name: "How do I fight an enemy when I encounter one?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("valiantSoldierConversationFight");
                }
            },
            {
                name: "Where do I find enemies to fight?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("valiantSoldierConversationFind");
                }
            }
        ]
    },
    "valiantSoldierConversationFight":{
        title: "Talk to Valiant Soldier Fight",
        id: "valiantSoldierConversationFight",
        encounterRate: 1, 
        description: "\"What do you mean? You just attack it.\"\n\n\"So like--I just type the word \'attack\' in the textbox?\" you ask.\n\n\"I do not know what you mean by the word \'type,\' nor do I understand this word \'textbox.\' You seem to be speaking a foreign language.\"",
        actions: [
            {
                name: "Oh sorry. You see, I\'m not actually a real character in this world. I am playing a game, and whenever I encounter a battle scene in this game, I have to type something in a textbox.",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("valiantSoldierConversationReal");
                }
            },
            {
                name: "Never mind, I am just babbling nonsense. But what if the enemy is resistant to my attacks?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("valiantSoldierConversationResistant");
                }
            }
        ]
    },
    "valiantSoldierConversationReal":{
        title: "Talk to Valiant Soldier Real",
        id: "valiantSoldierConversationReal",
        encounterRate: 1, 
        description: "\"Are you claiming to not be of this world? Are you claiming to be a god? What nonsense.\"\n\nThe valiant soldier scoffs at you, turns his back, and walks away.",
        actions: []
    },
    "valiantSoldierConversationResistant":{
        title: "Talk to Valiant Soldier Resistant",
        id: "valiantSoldierConversationResistant",
        encounterRate: 1, 
        description: "\"Resistant to your attacks? What sort of enemy are you talking about?\" the soldier asks.",
        actions: [
            {
                name: "Like a common sloth.",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("valiantSoldierConversationSloth");
                }
            },
            {
                name: "Like a common gluttony.",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("valiantSoldierConversationGluttony");
                }
            }
        ]
    },
    "valiantSoldierConversationSloth":{
        title: "Talk to Valiant Soldier Sloth",
        id: "valiantSoldierConversationSloth",
        encounterRate: 1, 
        description: "\"Ah--you must be joking. Why would you fight sloth? Sloth is good for you. It enables you to rest. Just give in to your desire to sleep.\"\n\n\"I see,\" you say, as you ponder the words of the valiant soldier. You wonder if somebody else would be able to help you in the fight against some of these non-physical enemies.",
        actions: []
    },
    "valiantSoldierConversationGluttony":{
        title: "Talk to Valiant Soldier Gluttony",
        id: "valiantSoldierConversationGluttony",
        encounterRate: 1, 
        description: "\"Ah--you must be joking. Why would you fight gluttony? Gluttony is good for you. It gives you food. Just give in to your desire to eat.\"\n\n\"I see,\" you say, as you ponder the words of the valiant soldier. You wonder if somebody else would be able to help you in the fight against some of these non-physical enemies.",
        actions: []
    },
    "valiantSoldierConversationFind":{
        title: "Talk to Valiant Soldier Find",
        id: "valiantSoldierConversationFind",
        encounterRate: 1, 
        description: "\"Enemies are everywhere, lurking in every corner. When you walk around to different places, they are bound to appear. And you must be ready to fight them when they do.\"",
        actions: [
            {
                name: "How do I fight an enemy when I see one?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("valiantSoldierConversationFight");
                }
            },
            {
                name: "I see. Thank you for your time.",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("valiantSoldierConversationEnd");
                }
            }
        ]
    },
    "valiantSoldierConversationEnd":{
        title: "Talk to Valiant Soldier End",
        id: "valiantSoldierConversationEnd",
        encounterRate: 1, 
        description: "The valiant soldier nods his head, and you take your leave.",
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
        title: "Babble with Babbler 3",
        encounterRate: 1, 
        description: '\"You know what I would love to do one day? I would love to build a tower that reaches to the heavens. I would make such a name for myself, don\'t you think?\"\n\n(-5 Spiritual HP)',
        autoAction: {
            name: "Talk with Babbler 3",
            actionType: "setCharCondition",
            func: (gameState, event, setCurrentEvent) => {
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.spiritualHp = Math.max(0,newCharCondition.spiritualHp - 5);
                    }));
                }
            }
    },
    "babbleWithBabbler4":{
        title: "Babble with Babbler 4",
        id: "babbleWithBabbler4",
        encounterRate: 1, 
        description: 'Did you hear the legend of the powerful sorceror? I heard he once turned his staff into a serpent. Or did he turn his serpent into a staff? I forget.\n\n(-5 Spiritual HP)',
        autoAction: {
            name: "Talk with Babbler 4",
            actionType: "setCharCondition",
            func: (gameState, event, setCurrentEvent) => {
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.spiritualHp = Math.max(0,newCharCondition.spiritualHp - 5);
                    }));
                }
            }
    },
    "babbleWithBabbler5":{
        title: "Babble with Babbler 5",
        id: "babbleWithBabbler5",
        encounterRate: 1, 
        description: '\"A traveler once told me that he faced a terrifying spirit of fear in this place called Yam Suph, located in the wilderness. I asked him where it was, but he was too afraid to say. But he did draw this map for me.\"\n\nThe babbler pulls a crinkled map out of his coat pocket. \"You know what? I don\'t really need this map anymore. Why don\'t you have it?\"\n\n(-5 Spiritual HP) (+1 Map to Yam Suph)',
        autoAction: {
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
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.spiritualHp = Math.max(0,newCharCondition.spiritualHp - 5);
                        }));
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
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.spiritualHp = Math.max(0,newCharCondition.spiritualHp - 5);
                        }));
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
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.spiritualHp = Math.max(0,newCharCondition.spiritualHp - 5);
                        }));
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
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.spiritualHp = Math.max(0,newCharCondition.spiritualHp - 5);
                        }));
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
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.spiritualHp = Math.max(0,newCharCondition.spiritualHp - 5);
                        }));
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
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.spiritualHp = Math.max(0,newCharCondition.spiritualHp - 5);
                        }));
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
                    gameState.setCharCondition(produce((newCharCondition)=>{
                        newCharCondition.spiritualHp = Math.max(0,newCharCondition.spiritualHp - 5);
                        }));
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
        actions: []
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
                gameState.setInventory(produce((newInventory)=>{
                    updateInventory(newInventory, "rope");
                }));            
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
    // I can't figure out this Lost Man stuff. It's not working for me.
    "theLostManQuest": {
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
    
    //land of the Patriarchs events

    "merchantsOfMidianShop": {
        title: "Merchants of Midian Shop",
        id: "merchantsOfMidianShop",
        encounterRate: 1, 
        description: "\"Greetings,\" one of the merchants says to you, \"Are you interested in any of these items?\"",
        actions: [{
            name: "Bag of Lentils",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("getLentils");
            }
        },
        {
            name: "Goat",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("getGoat");
            }
        },
        {
            name: "Sheep",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("getSheep");
            }
        },
        {
            name: "Camel",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("getCamel");
            }
        },
        {
            name: "Cow",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("getCow");
            }
        },
        {
            name: "Donkey",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("getDonkey");
            }
        },
        {
            name: "Slave",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("getSlave");
            }
        }]
    },
    "getLentils":{
        title: "Get Bag of Lentils",
        id: "getLentils",
        encounterRate: 1, 
        description: "A bag of lentils costs 1 shekel of silver. Oh--it doesn\'t seem like you have the right currency.",
        actions: []
    },
    "getGoat":{
        title: "Get Goat",
        id: "getGoat",
        encounterRate: 1, 
        description: "A goat costs 3 shekels of silver. Oh--it doesn\'t seem like you have the right currency.",
        actions: []
    },
    "getSheep":{
        title: "Get Sheep",
        id: "getSheep",
        encounterRate: 1, 
        description: "A sheep costs 3 shekels of silver. Oh--it doesn\'t seem like you have the right currency.",
        actions: []
    },
    "getCamel":{
        title: "Get Camel",
        id: "getCamel",
        encounterRate: 1, 
        description: "A camel costs 10 shekels of silver. Oh--it doesn\'t seem like you have the right currency.",
        actions: []
    },
    "getCow":{
        title: "Get Cow",
        id: "getCow",
        encounterRate: 1, 
        description: "A cow costs 10 shekels of silver. Oh--it doesn\'t seem like you have the right currency.",
        actions: []
    },
    "getDonkey":{
        title: "Get Donkey",
        id: "getDonkey",
        encounterRate: 1, 
        description: "A donkey costs 10 shekels of silver. Oh--it doesn\'t seem like you have the right currency.",
        actions: []
    },
    "getSlave":{
        title: "Get Slave",
        id: "getSlave",
        encounterRate: 1, 
        description: "A slave costs 30 shekels of silver. Oh--it doesn\'t seem like you have the right currency.",
        actions: []
    },
    "rescueTheCaptives":{        
        title: "Rescue the Captives",
        id: "rescueTheCaptives",
        encounterRate: 1,
        description: "You see an exhausted man with terror on his face running over to you. \"What\'s the matter?\" you ask.\n\nWith tears in his eyes, the man takes a few large breaths and responds, \"Our cities have been attacked and plundered, and our people have been taken captive.\"\n\n\"Take courage,\" you say, \"I will rescue them!\"\n\nThe terrified man regains his composure, blinks his eyes a few times, and gives you a good look. Then he suddenly bursts into laughter.\n\n\"You?! Who do you think you are? You wouldn\'t stand a chance.\"\n\nYou walk away in embarrassment. Maybe you should come back when you are stronger.",
        actions: []
    },
    "beershebaStart":{        
        title: "Beersheba Start",
        id: "beershebaStart",
        encounterRate: 1,
        description: "You enter the tent and see a man sitting on the floor cooking some delicious lentil stew. Your mouth starts to water. It is the most delicious stew you\'ve ever laid your eyes on.\n\n\"Hello there. Are you interested in some of this lentil stew?\" the man says.",
        actions: [
            {
                name: "Yes, absolutely! I am famished.",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("beersheba2");
                }
            },
            {
                name: "No thank you. I'm alright.",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("beershebaExit");
                }
            }
        ]
    },
    "beersheba2":{
        title: "Beersheba 2",
        id: "beersheba2",
        encounterRate: 1, 
        description: "\"Well, first,\" says the man, \"sell me your birthright.\"\n\n\"What is that?\" you ask.\n\nThe man looks up and studies you for a moment before speaking. \"It\'s the entitlement to a double portion of your father\'s inheritance. You would have one if you are the firstborn of your family.\"\n\n\"Oh,\" you say. You don\'t seem to remember if you are the firstborn. But even if you were, you wouldn\'t know how to talk to your dad. You\'re not really on good terms with your dad. It\'s a long story.\n\n\"Well?\" the man asks, seeming a bit annoyed. You notice that he is grasping your heel for some reason.",
        actions: [
            {
                name: "Okay, here is my birthright.",
                func: (gameState, event, setCurrentEvent) => { 
                    if (gameState.inventory.items["birthleft"] >= 3) {
                        gameState.setInventory(produce((newInventory)=>{
                            newInventory.items["birthleft"] = Math.max(0, newInventory.items["birthleft"] - 3); 
                            updateInventory(newInventory, "lentilStew");
                        }));
                        setCurrentEvent("beersheba3");
                    } else if (gameState.inventory.items["birthleft"] >= 0) {
                        setCurrentEvent("beershebaExit2");
                    } else
                    setCurrentEvent("beershebaExit3");
                }
            },
            {
                name: "I don\'t think I have a birthright.",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("beershebaExit4");
                }
            }
        ]
    },
    "beersheba3":{
        title: "Beersheba 3",
        id: "beersheba3",
        encounterRate: 1, 
        description: "\"Let me see...\" the man says. He ponders for a moment.\n\n\"Well, I see you have three birthlefts. I suppose that will do. Three birthlefts do make a birthright.\"\n\nThe man takes your three birthlefts and magically conjures up a birthright, which he places it in his pocket. Then he works some more magic in a big pot and conjures up a bowl of lentil stew, which he presents to you.\n\n+1 Lentil Stew",
        actions: [
            {
                name: "How did you do that?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("beershebaCooking");
                }
            },
            {
                name: "Thank you! Blessings to you.",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("beershebaExit5");
                }
            }
        ]
    },
    "beershebaCooking":{
        title: "Beersheba Cooking",
        id: "beershebaCooking",
        encounterRate: 1, 
        description: "\"Oh, that? That is an ancient magic that I practice. Throughout history, people have called it different names. I call it called cooking.\"",
        actions: [
            {
                name: "What is cooking?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("beershebaCooking2");
                }
            },
            {
                name: "How did you learn this magic?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("beershebaCookingHow");
                }
            }
        ]
    },
    "beershebaCooking2":{
        title: "Beersheba Cooking 2",
        id: "beershebaCooking2",
        encounterRate: 1, 
        description: "\"It is a very difficult art to master, and few have the wisdom to understand it. But I will try to explain it in simple terms to you.\"\n\nYou nod in anticipation.\n\n\"There are items in this world called ingredients. And when these select ingredients come together, and if you apply heat, then the sum of the ingredients will be greater than the individual items themselves. In fact, you will conjure up a new food altogether, which is thousands of times more delicious than the individual ingredients by themsevles.\"",
        actions: [
            {
                name: "Can you teach me?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("beershebaCooking3");
                }
            },
            {
                name: "How did you learn this magic?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("beershebaCookingHow");
                }
            }
        ]
    },
    "beershebaCooking3":{
        title: "Beersheba Cooking 3",
        id: "beershebaCooking3",
        encounterRate: 1, 
        description: "The man eyes you with suspicion, and he pauses before speaking again. \"Few have the patience to master cooking. But if you wish to endeavor on this noble task, I will teach you.\"\n\n\"Yes, please!\" you exclaim.\n\n\"The first food I will teach you how to make is called Hot Water. It is the base of many other foods, and it is also moderately useful in combat. Aside from a heat source, there is simply one ingredient required: water. Simply put the water into a pot, heat it up, and then you will have hot water.\"\n\nYou learned the Hot Water Recipe!",
        actions: [
            {
                name: "Where do I get a pot?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("beershebaCookingPot");
                }
            },
            {
                name: "How do I heat up the pot?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("beershebaCooking4");
                }
            }
        ]
    },
    "beershebaCooking4":{
        title: "Beersheba Cooking 4",
        id: "beershebaCooking4",
        encounterRate: 1, 
        description: "\"You will need to collect fuel sources. Typically, 3 Scrap Woods or 1 Coal should be enough to make one food item.\"",
        actions: [
            {
                name: "Where do I get a pot?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("beershebaCookingPot");
                }
            },
            {
                name: "Got it. Thank you very much.",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("beershebaExit5");
                }
            }
        ]
    },
    "beershebaCookingHow":{
        title: "Beersheba Cooking How",
        id: "beershebaCookingHow",
        encounterRate: 1, 
        description: "\"When I was a child, I spent many years studying under a certain master of the secret arts. He was so skilled that people gave him the most famed title of prestige in all the land: the cook. It was he who taught me the art of cooking.\"",
        actions: [
            {
                name: "What is cooking?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("beershebaCooking2");
                }
            },
            {
                name: "I see. That seems too advanced for me. See you later.",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("beershebaCookingExit5");
                }
            }
        ]
    },
    "beershebaCookingPot":{
        title: "Beersheba Cooking Pot",
        id: "beershebaCookingPot",
        encounterRate: 1, 
        description: "\"The pot is one of the rarest of items in all the land. Perhaps one day you will be able to obtain your own. But I\'ll let you borrow mine each time you visit me here.\"",
        actions: [
            {
                name: "Thank you. And how do I heat up the pot?",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("beershebaCooking4");
                }
            },
            {
                name: "Thank you. I am forever grateful for this lesson.",
                func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("beershebaCookingExit5");
                }
            }
        ]
    },
    "beershebaExit":{
        title: "Beersheba Exit",
        id: "beershebaExit",
        encounterRate: 1, 
        description: "\"You do you. If you ever want some lentil stew, you know where to find me.\"",
        actions: []
    },
    "beershebaExit2":{
        title: "Beersheba Exit 2",
        id: "beershebaExit2",
        encounterRate: 1, 
        description: "\"I said I want a birthRIGHT, not a birthLEFT. Do you even know the difference between your left and your right?\"",
        actions: []
    },
    "beershebaExit3":{
        title: "Beersheba Exit 3",
        id: "beershebaExit3",
        encounterRate: 1, 
        description: "\"It doesn\'t seem like you have a birthright. Come back when you get one.\"",
        actions: []
    },
    "beershebaExit4":{
        title: "Beersheba Exit 4",
        id: "beershebaExit4",
        encounterRate: 1, 
        description: "\"Well, if you ever get one, you know where to find me.\"",
        actions: []
    },
    "beershebaExit5":{
        title: "Beersheba Exit 5",
        id: "beershebaExit5",
        encounterRate: 1, 
        description: "\"Blessings to you.\"\n\nAs you leave the tent, you notice that he has his fingers crossed.",
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

    //land of the Judges events

    "bankOfTheJordanExchange": {
        title: "Bank of the Jordan Exchange",
        id: "bankOfTheJordanExchange",
        encounterRate: 1, 
        description: "\"Hello wanderer,\" a smiling man says to you, \"Here we can exchange currencies for you, with a small fee of course. What are you looking to obtain?\"",
        actions: [{
            name: "Drachmae",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("exchangeDrachmae");
            }
        },
        {
            name: "Shekels",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("exchangeShekels");
            }
        },
        {
            name: "Minae",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("exchangeMinae");
            }
        },
        {
            name: "Talents",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("exchangeTalents");
            }
        },
        {
            name: "I don't understand",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("exchangeHelp");
            }
        }]
    },
    "bankOfTheJordanExchange2": {
        title: "Bank of the Jordan Exchange 2",
        id: "bankOfTheJordanExchange2",
        encounterRate: 1, 
        description: "\"So what are you looking to obtain?\"",
        actions: [{
            name: "Drachmae",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("exchangeDrachmae");
            }
        },
        {
            name: "Shekels",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("exchangeShekels");
            }
        },
        {
            name: "Minae",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("exchangeMinae");
            }
        },
        {
            name: "Talents",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("exchangeTalents");
            }
        },
        {
            name: "I don't understand",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("exchangeHelp");
            }
        }]
    },
    "exchangeDrachmae": {
        title: "Exchange Drachmae",
        id: "exchangeDrachmae",
        encounterRate: 1, 
        description: "\"So you want drachmae. How proper of you. Each shekel is worth 4 drachmae. But I'll give you 3 because I got to eat too! How many drachmae would you like?\"\n\nNote: Not sure how to work this.",
        actions: []
    },
    "exchangeShekels": {
        title: "Exchange Shekels",
        id: "exchangeShekels",
        encounterRate: 1, 
        description: "\"So you want shekels of silver. Dealing in the black market, I presume? Each shekel of silver is the equivalent of 4 drachmae. But I'll charge you 5, because I got to eat too! How many would you like?\"\n\nNote: Not sure how to work this.",
        actions: []
    },
    "exchangeMinae": {
        title: "Exchange Minae",
        id: "exchangeMinae",
        encounterRate: 1, 
        description: "\"So you want minae. Old school. Each mina is the equivalent of 100 drachmae. But I'll charge you 120, because I got to eat too! How many would you like?\"\n\nNote: Not sure how to work this.",
        actions: []
    },
    "exchangeTalents": {
        title: "Exchange Talents",
        id: "exchangeTalents",
        encounterRate: 1, 
        description: "\"So you want talents. How posh of you. Each talent is the equivalent of 60 minae. But I'll charge you 80, because I got to eat too! How many would you like?\"\n\nNote: Not sure how to work this.",
        actions: []
    },
    "exchangeHelp": {
        title: "Exchange Help",
        id: "exchangeHelp",
        encounterRate: 1, 
        description: "\"Different lands utilize different currencies. So if, hypothetically, you try to spend shekels at a store that only takes drachmae, you'll get nowhere.\"",
        actions: [{
            name: "I see.",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("bankOfTheJordanExchange2");
            }
        },
        {
            name: "What if I'm looking for currency that you don't have?",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("exchangeDontHave");
            }
        },
    ]
    },
    "exchangeDontHave": {
        title: "Exchange Don't Have",
        id: "exchangeDontHave",
        encounterRate: 1, 
        description: "\"What sort of currencies are you talking about?\"",
        actions: [{
            name: "What about small copper coins?",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("exchangeSmallCopper");
            }
        },
        {
            name: "What about coins of the heavenly variety?",
            func: (gameState, event, setCurrentEvent) => {
                    setCurrentEvent("exchangeHeavenly");
            }
        },
    ]
    },
    "exchangeSmallCopper": {
        title: "Exchange Small Copper",
        id: "exchangeSmallCopper",
        encounterRate: 1, 
        description: "\"You mean leptons? Those are basically useless. Why would I stock those?\"",
        actions: []
    },
    "exchangeHeavenly": {
        title: "Exchange Heavenly",
        id: "exchangeHeavenly",
        encounterRate: 1, 
        description: "\"What are you, some sort of religious fanatic? Why collect heavenly coins when you live on earth?\"",
        actions: []
    },
    // future events that haven't been implemented yet
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
