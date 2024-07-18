
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
        children:[]
    },
    "world": {
        title: "World",
        id: "world",
        description: "This is the great big world. You take a deep breath and look around. Where should you go?\n\nLarry\'s Note: These places will be reassigned elsewhere later.",
        events: [],
        children: ["cityOfDestruction", "wilderness", "landOfThePatriarchs", "landOfTheJudges"],
        parent: null
    },
    "house":{
        title: "Your House",
        id: "house",
        description: "You look around at your humble abode. Where would you like to go?",
        events: [],
        children: ["bedroom", "prayerCloset", "livingRoom"],
        parent: "cityOfDestruction"
    },
    "bedroom":{
        title: "Bedroom",
        id: "bedroom",
        description: "You walk into your neat, nice bedroom and see a soft plush bed.",
        events: ["restBedroom"],
        children: [],
        parent: "house"
    },
    "prayerCloset":{
        title: "Prayer closet",
        id: "prayerCloset",
        description: "You walk into your prayer closet and close your eyes.",
        events: ["prayCloset"],
        children: [],
        parent: "house"
    },
    "livingRoom": {
        title: "Living room",
        id: "livingRoom",
        description: "You walk into your living room, your go-to place for shenanigans and hangouts.",
        events: ["searchForCoinsBedroom"],
        enemies: ["mothAndRust", "commonSloth"],
        children: [],
        parent: "house"
    },
    "cityOfDestruction": {
        title: "City of Destruction",
        id: "cityOfDestruction",
        description: "You venture out into the City of Destruction. It's a somewhat foreboding name, but you didn't choose it. You just happen to live here. Where would you like to go?",
        events: [],
        children: ["house", "townTailor", "brokenCistern", "emptyLand"],
        parent: "world"
    },
    "townTailor": {
        title: "Town Tailor",
        id: "townTailor",
        description: "You stroll into the Tailor's Shop and see a crusty, old man at his workbench.",
        events: ["getSomeClothes"],
        children: [],
        parent: "cityOfDestruction"
    },
    "brokenCistern": {
        title: "Broken Cistern",
        id: "brokenCistern",
        description: "You look into the broken cistern. It doesn’t seem like it holds much water. You try to grab the water in the cistern with your hand, but it slips through your fingers.",
        events: [],
        children: [],
        parent: "cityOfDestruction"
    },
    "emptyLand": {
        title: "Empty Land",
        id: "emptyLand",
        description: "You see a large plot of land, covered with thorns and thistles. It looks cursed.",
        events: [],
        children: [],
        parent: "cityOfDestruction"
    },
    "wilderness": {
        title: "The Wilderness",
        id: "wilderness",
        description: "You walk out into the Wilderness. You hear a faint voice crying out, \"Prepare the way of the Lord; make his paths straight.\"\n\nYou look around but don't see any paths. Maybe these paths are not literal but metaphorical?",
        events: [],
        children: ["theLostMan", "fieldOfManna", "valleyOfStones", "desertOfWandering", "bronzeSerpent", "yamSuph"],
        parent: "world"
    },
    "theLostMan": {
        title: "The Lost Man",
        id: "theLostMan",
        description: "You meet a man aimlessly wandering around. You ask him what\'s going on.\n\n\"I\'m not sure,\" he says, \"Someone told me that there was this magical place called Eden out here, where nothing is cursed and everything is living. It didn\'t seem possible, but something inside of me told me to go look for it. So I went out to find it, and now I\'m completely lost. I have no idea where I am.\"\n\n\"Where did you come from?\" you ask.\n\n\"I live in the Land of the Patriarchs. But I don\'t know how to get there. I don\'t really have a sense of direction.\"",
        events: [],
        children: [],
        parent: "wilderness"
    },
    "fieldOfManna": {
        title: "Field of Manna",
        id: "fieldOfManna",
        description: "You see a field filled with some sort of bread.",
        events: ["gotManna"],
        children: [],
        parent: "wilderness"
    },
    "valleyOfStones": {
        title: "Valley of Stones",
        id: "valleyOfStones",
        description: "You see a large valley of stones, in all shapes and sizes. Some of them look pretty dangerous.",
        events: [],
        enemies: ["waterStone", "breadStone", "ancientBoundaryStone"],
        children: [],
        parent: "wilderness"
    },
    "desertOfWandering": {
        title: "Desert of Wandering",
        id: "desertOfWandering",
        description: "It\'s blistering hot. You\'re tired, thirsty, and hungry. This is the type of place where you might see a mirage of an oasis.",
        events: [],
        enemies: ["commonGluttony", "grumblingOrgan", "fierySerpent"],
        children: [],
        parent: "wilderness"
    },
    "bronzeSerpent": {
        title: "The Bronze Serpent",
        id: "bronzeSerpent",
        description: "You see a magnificent bronze serpent set on a pole. You\'re not sure what it means, but looking at it seems to give you life.",
        events: ["lookBronzeSerpent"],
        children: [],
        parent: "wilderness"
    },
    "yamSuph": {
        title: "Yam Suph",
        id: "yamSuph",
        description: "You see a large body of water before you. Some say that the water is red, while others say that the water is filled with reeds. You\'re not quite sure. Either way, you sense that something extraordinary happened here long ago.",
        events: ["greatFear"],
        children: [],
        parent: "wilderness"
    },
    "landOfThePatriarchs": {
        title: "Land of the Patriarchs",
        id: "landOfThePatriarchs",
        description: "You try to go to the Land of the Patriarchs, but you can't figure out how to get there. Seems like you need somebody to guide you there.",
        events: [],
        children: [],
        parent: "world"
    },
    "landOfTheJudges": {
        title: "Land of the Judges",
        id: "landOfTheJudges",
        description: "As you approach the Land of the Judges, you notice that all the people there are of great size. You seem like a grasshopper in their eyes. Immediately, you are stricken by fear, and you run back to the Wilderness.",
        events: [],
        children: [],
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
    "bethel": {
        title: "Bethel",
        id: "bethel",
        description: "There's not much here. All you see is an unassuming stone laying on the ground.",
        events: ["sleepOnStone"],
        children: [],
        parent: "landOfThePatriarchs"
    },
    "valleyOfSiddim": {
        title: "Valley of Siddim",
        id: "valleyOfSiddim",
        description: "A great battle happened here long ago.",
        events: ["rescueTheCaptives"],
        children: [],
        parent: "landOfThePatriarchs"
    },
    "cityOfSodom": {
        title: "City of Sodom",
        id: "cityOfSodom",
        description: "You enter the great city of wickedness. The outcry against Sodom is great.",
        events: [],
        enemies: ["meaninglessOffering", "worthlessAssembly", "handOfBlood", "commonPride"],
        children: [],
        parent: "landOfThePatriarchs"
    },
    "templeJerusalem":{
        title: "Temple of Jerusalem",
        id: "templeJersualem",
        description: "The great temple of Jerusalem looms above you. The rich smell of incense overwhelms your senses.",
        events: ["donatingMoneyTemple"],
        children:[],
        parent: "landOfTheApostles"
    },
    "fieldOfBoaz":{
        title: "Field of Boaz",
        id: "fieldOfBoaz",
        description: "You see a large field of barley with many harvesters.",
        events: ["gotBarleyFieldOfBoaz"],
        children:[],
        parent: "landOfTheJudges"
    }
   
};
