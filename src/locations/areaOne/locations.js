
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
        children: ["cityOfDestruction", "templeJerusalem", "fieldOfBoaz"],
        parent: null
    },
    "house":{
        title: "Your House",
        id: "house",
        description: "You look around at your humble abode. Where would you like to go?",
        events: [],
        children: ["bedroom", "prayerCloset", "livingRoom", "cityOfDestruction"],
        parent: null
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
        children: ["house", "townTailor", "brokenCistern", "emptyLand","world"],
        parent: null
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
    "templeJerusalem":{
        title: "Temple of Jerusalem",
        id: "templeJersualem",
        description: "The great temple of Jerusalem looms above you. The rich smell of incense overwhelms your senses.",
        events: ["donatingMoneyTemple"],
        children:[],
        parent: "world"
    },
    "fieldOfBoaz":{
        title: "Field of Boaz",
        id: "fieldOfBoaz",
        description: "You see a large field of barley with many harvesters.",
        events: ["gotBarleyFieldOfBoaz"],
        children:[],
        parent: "world"
    }
   
};
