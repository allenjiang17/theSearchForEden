
/*README FOR ADDING EVENTS

This is an intentionally flat datastructure for easy lookups/no tree traversals. 

eventId: {
    title: "Title of location",
    id: "locationId", -- choose a UNIQUE ID.
    description: "Description of location" -- will display in location header
    children: [] -- list of child locations
    parent: "locationId" -- parent location
*/

export const AreaOneLocations = {
    "beginning":{
        title: "Beginnings",
        id: "beginning",
        events: ["beginnings"],
        children:[],
        parent: null,
        initialUnlocked: true
    },
    "world": {
        title: "World",
        id: "world",
        description: "This is the great big world. You take a deep breath and look around. Where do you want to go?",
        events: [],
        children: ["cityOfDestruction", "wilderness", "landOfThePatriarchs", "landOfTheJudges", "landOfTheKings", "landOfThePoets", "landOfTheProphets", "landOfTheApostles", "heavenlyPlaces",],
        parent: null,
        initialUnlocked: true
    },
    "house":{
        title: "Your House",
        id: "house",
        description: "You look around at your humble abode. Where would you like to go?",
        events: [],
        children: ["bedroom", "prayerCloset", "livingRoom"],
        parent: "cityOfDestruction",
        initialUnlocked: true
    },
    "bedroom":{
        title: "Bedroom",
        id: "bedroom",
        description: "You walk into your neat, nice bedroom and see a soft plush bed.",
        events: ["nightRest"],
        children: [],
        parent: "house",
        initialUnlocked: true
    },
    "prayerCloset":{
        title: "Prayer Closet",
        id: "prayerCloset",
        description: "You walk into your prayer closet and close your eyes.",
        events: ["prayCloset"],
        children: [],
        parent: "house",
        initialUnlocked: true
    },
    "livingRoom": {
        title: "Living Room",
        id: "livingRoom",
        description: "You walk into your living room, your go-to place for shenanigans and hangouts.",
        events: ["searchForCoinsBedroom"],
        enemies: ["mothAndRust", "commonSloth"],
        children: [],
        parent: "house",
        initialUnlocked: true
    },
    "cityOfDestruction": {
        title: "City of Destruction",
        id: "cityOfDestruction",
        description: "You venture out into the City of Destruction. It's a somewhat foreboding name, but you didn't choose it. You just happen to live here. Where would you like to go?",
        events: [],
        children: ["house", "townSquare", "cursedFigTree", "brokenCistern", "emptyLand"],
        parent: "world",
        initialUnlocked: true
    },
    "townSquare": {
        title: "Town Square",
        id: "townSquare",
        description: "You walk into a busy town square. You hear a cacophany of voices and musical instruments.",
        events: [],
        children: ["valiantSoldier", "craftySirPenn", "simpleBabbler", "wickedDeceiver", "dishonestMerchant", "travelingProphetess"],
        parent: "cityOfDestruction",
        initialUnlocked: true
    },
    "valiantSoldier": {
        title: "The Valiant Soldier",
        id: "valiantSoldier",
        description: "You see a valiant soldier in a full suit of armor. His soul has been hardened by years of battle.",
        events: ["valiantSoldierConversation"],
        children: [],
        parent: "townSquare",
        initialUnlocked: true
    },
    "travelingProphetess": {
        title: "The Traveling Prophetess",
        id: "travelingProphetess",
        description: "You see an unassuming woman talking a stroll. She doesn't seem to be from here, but there's something about her that intrigues you.",
        events: ["learnFirstIncantation"],
        children: [],
        parent: "townSquare",
        initialUnlocked: true
    },
    "craftySirPenn": {
        title: "The Crafty Sir Penn",
        id: "craftySirPenn",
        description: "You stroll into the Crafty Sir Penn's Shop and see a crusty, old man at his workbench.",
        events: ["getSomeClothes"],
        children: [],
        parent: "townSquare",
        initialUnlocked: true
    },
    "simpleBabbler": {
        title: "The Simple Babbler",
        id: "simpleBabbler",
        description: "You notice a jolly man who is starting up conversations with everybody. He almost seems... too friendly. He is babbling on and on about how this person did this and that person did that.",
        events: ["babbleWithBabbler"],
        children: [],
        parent: "townSquare",
        initialUnlocked: true
    },
    "wickedDeceiver": {
        title: "The Wicked Deceiver",
        id: "wickedDeceiver",
        description: "You notice a shadowy figure in a large cloak, mischievously shifting his eyes.",
        events: ["chatWithDeceiver"],
        children: [],
        parent: "townSquare",
        initialUnlocked: true
    },
    "dishonestMerchant": {
        title: "The Dishonest Merchant",
        id: "dishonestMerchant",
        description: "You see a merchant in lavish clothes. He uses dishonest scales and loves to defraud.",
        events: ["chatWithMerchant"],
        children: [],
        parent: "townSquare",
        initialUnlocked: true
    },
    "cursedFigTree": {
        title: "Cursed Fig Tree",
        id: "cursedFigTree",
        description: "You walk by a cursed fig tree. It hasn't bore fruit in years, but there are still leaves on it.",
        events: ["getFigLeaf"],
        children: [],
        parent: "cityOfDestruction",
        initialUnlocked: true
    },
    "brokenCistern": {
        title: "Broken Cistern",
        id: "brokenCistern",
        description: "You look into the broken cistern. There seems to be a little bit of water inside.",
        events: ["getWaterFromCistern"],
        children: [],
        states: {
            "redeemedCistern": {
                title: "Spring of Living Water",
                id: "springOfLivingWater",
                description: "This is a spring of living water. The one who drinks from this well will never thirst again.",
                events: []
            }
        },
        parent: "cityOfDestruction",
        initialUnlocked: true
    },
    "emptyLand": {
        title: "Empty Land",
        id: "emptyLand",
        description: "You see a large plot of land, covered with thorns and thistles. It looks cursed.",
        events: [],
        children: [],
        states: {
            "redeemed": {
                title: "Redeemed Land",
                id: "redeemedLand",
                description: "You see a large plot of land, filled with agricultural opportunity. Maybe if you work it and take care of it, it can become beautiful again.",
                events: []
            }
        },
        parent: "cityOfDestruction",
        initialUnlocked: true
    },
    "wilderness": {
        title: "The Wilderness",
        id: "wilderness",
        description: "You walk out into the Wilderness. You hear a faint voice crying out, \"Prepare the way of the Lord; make his paths straight.\"\n\nYou look around but don't see any paths. Maybe these paths are not literal but metaphorical?",
        events: [],
        children: ["theLostMan", "fieldOfManna", "valleyOfStones", "desertOfWandering", "heapOfRuins", "bronzeSerpent", "burningBush", "yamSuph"],
        parent: "world",
        initialUnlocked: true
    },
    "theLostMan": {
        title: "The Lost Man",
        id: "theLostMan",
        description: "You meet a man aimlessly wandering around.",
        events: ["theLostManQuest"],
        children: [],
        parent: "wilderness",
        initialUnlocked: true
    },
    "fieldOfManna": {
        title: "Field of Manna",
        id: "fieldOfManna",
        description: "You see a field filled with some sort of bread.",
        events: ["gotManna"],
        children: [],
        parent: "wilderness",
        initialUnlocked: true
    },
    "valleyOfStones": {
        title: "Valley of Stones",
        id: "valleyOfStones",
        description: "You see a large valley of stones, in all shapes and sizes. Some of them look pretty dangerous.",
        events: [],
        enemies: ["waterStone", "breadStone", "ancientBoundaryStone"],
        children: [],
        parent: "wilderness",
        initialUnlocked: true
    },
    "desertOfWandering": {
        title: "Desert of Wandering",
        id: "desertOfWandering",
        description: "It\'s blistering hot. You\'re tired, thirsty, and hungry. This is the type of place where you might see a mirage of an oasis.",
        events: [],
        enemies: ["commonGluttony", "grumblingOrgan"],
        children: [],
        parent: "wilderness",
        initialUnlocked: true
    },
    "heapOfRuins": {
        title: "Heap of Ruins",
        id: "heapOfRuins",
        description: "A thriving city once stood here, long ago. But now it is a heap of ruins, a haunt of jackals, and a place of desolation. Only wild animals reside here now.",
        events: ["captureLocust", "getCamelHair"],
        enemies: ["fierySerpent"],
        children: [],
        parent: "wilderness",
        initialUnlocked: true
    },
    "bronzeSerpent": {
        title: "The Bronze Serpent",
        id: "bronzeSerpent",
        description: "You see a magnificent bronze serpent set on a pole. You\'re not sure what it means, but looking at it seems to give you life.",
        events: ["lookBronzeSerpent"],
        children: [],
        parent: "wilderness",
        initialUnlocked: true
    },
    "burningBush": {
        title: "The Burning Bush",
        id: "burningBush",
        description: "You see a strange bush that is on fire, but it is not burning up. You are filled with awe, and you feel that you are standing on holy ground.",
        events: ["approachBurningBush"],
        children: [],
        parent: "wilderness",
        initialUnlocked: true
    },
    "yamSuph": {
        title: "Yam Suph",
        id: "yamSuph",
        description: "You see a large body of water before you. Some say that the water is red, while others say that the water is filled with reeds. You\'re not quite sure. But that\'s the last thing on your mind right now.\n\nAt once, terror and dread descend on your body. A thundering voice speaks, \"Was it because there were no graves in the City of Destruction that you have come to the desert to die?\"\n\nYou brace yourself for an epic battle of the mind.",
        events: [],
        children: ["fightGreatFear"],
        parent: "wilderness",
    },
    "fightGreatFear": {
        title: "The Great Fear",
        id: "fightGreatFear",
        description: "This is the most frightening thing you've ever faced. Your mind is filled with hideous images that are too terrifying to write here.",
        events: [],
        enemies: ["greatFear"],
        children: [],
        parent: "wilderness",
        initialUnlocked: true
    },
    "landOfThePatriarchs": {
        title: "Land of the Patriarchs",
        id: "landOfThePatriarchs",
        description: "The Land of the Patriarchs lies before you. This is the place where heroes of old fought courageous battles, wrestled angels, and quarrelled over wells.",
        events: [],
        children: ["merchantsOfMidian", "bethel", "tentOfBeersheba", "valleyOfSiddim", "cityOfSodom"],
        parent: "world"
    },
    "landOfTheJudges": {
        title: "Land of the Judges",
        id: "landOfTheJudges",
        description: "As you approach the Land of the Judges, you notice that all the people there are of great size. You seem like a grasshopper in their eyes. Immediately, you are stricken by fear, and you run back to the Wilderness.",
        events: [],
        children: [],
        states: {
            "landOfTheJudgesUnlocked": {
                title: "Land of the Judges",
                id: "landOfTheJudges2",
                description: "The Land of the Judges lies before you. It flows with milk, honey, and giants.",
                events: []
            }
        },
        parent: "world"
    },
    "landOfTheKings": {
        title: "Land of the Kings",
        id: "landOfTheKings",
        description: "You try to go to the Land of the Kings, but you can't figure out how to get there. Seems like you need somebody to guide you there.",
        events: [],
        children: [],
        parent: "world"
    },
    "landOfThePoets": {
        title: "Land of the Poets",
        id: "landOfThePoets",
        description: "You try to go to the Land of the Poets, but you can't figure out how to get there. Seems like you need somebody to guide you there.",
        events: [],
        children: [],
        parent: "world"
    },
    "landOfTheProphets": {
        title: "Land of the Prophets",
        id: "landOfTheProphets",
        description: "You try to go to the Land of the Prophets, but you can't figure out how to get there. Seems like you need somebody to guide you there.",
        events: [],
        children: [],
        parent: "world"
    },
    "landOfTheApostles": {
        title: "Land of the Apostles",
        id: "landOfTheApostles",
        description: "You try to go to the Land of the Apostles, but you can't figure out how to get there. Seems like you need somebody to guide you there.",
        events: [],
        children: [],
        parent: "world"
    },
    "heavenlyPlaces": {
        title: "The Heavenly Places",
        id: "heavenlyPlaces",
        description: "You try to go to the Heavenly Places, but you can't figure out how to get there. Seems like you need somebody to guide you there.",
        events: [],
        children: [],
        parent: "world"
    },
    "merchantsOfMidian": {
        title: "The Merchants of Midian",
        id: "merchantsOfMidian",
        description: "You see a large caravan of merchants. They have purchased some supplies at low prices and are currently selling those supplies at higher prices.",
        events: ["merchantsOfMidianShop"],
        children: [],
        parent: "landOfThePatriarchs",
        initialUnlocked: true
    },
    "bethel": {
        title: "Bethel",
        id: "bethel",
        description: "There's not much here. All you see is an unassuming stone laying on the ground.",
        events: ["sleepOnStone"],
        children: [],
        parent: "landOfThePatriarchs",
        initialUnlocked: true
    },
    "tentOfBeersheba": {
        title: "Tent of Beersheba",
        id: "tentOfBeersheba",
        description: "You see a humble tent erected near an ancient well. You smell some delicious food, and you suddenly realize that you are famished.",
        events: ["beershebaStart"],
        children: [],
        parent: "landOfThePatriarchs",
        initialUnlocked: true
    },
    "valleyOfSiddim": {
        title: "Valley of Siddim",
        id: "valleyOfSiddim",
        description: "A great battle happened here long ago.",
        events: ["rescueTheCaptives"],
        children: [],
        parent: "landOfThePatriarchs",
        initialUnlocked: true
    },
    "cityOfSodom": {
        title: "City of Sodom",
        id: "cityOfSodom",
        description: "You enter the great city of wickedness. The outcry against Sodom is great.",
        events: [],
        enemies: ["meaninglessOffering", "worthlessAssembly", "commonPride", "bedDefiler", "lefteousPerson"],
        children: [],
        parent: "landOfThePatriarchs",
        initialUnlocked: true
    },
    "templeJerusalem":{
        title: "Temple of Jerusalem",
        id: "templeJersualem",
        description: "The great temple of Jerusalem looms above you. The rich smell of incense overwhelms your senses.",
        events: ["donatingMoneyTemple"],
        children:[],
        parent: "landOfTheApostles",
        initialUnlocked: true
    },
    "fieldOfBoaz":{
        title: "Field of Boaz",
        id: "fieldOfBoaz",
        description: "You see a large field of barley with many harvesters.",
        events: ["gotBarleyFieldOfBoaz"],
        children:[],
        parent: "landOfTheJudges",
        initialUnlocked: true
    }
   
};
