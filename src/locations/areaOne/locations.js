
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
        description: "This is the great big world. You take a deep breath and look around. Where should you go?",
        events: [],
        children: ["house", "templeJerusalem", "fieldOfBoaz"],
        parent: null
    },
    "house":{
        title: "Your House",
        id: "house",
        description: "This is your humble abode. ",
        events: [],
        children: ["bedroom", "livingRoom"],
        parent: "world"
    },
    "bedroom":{
        title: "Bedroom",
        id: "bedroom",
        description: "A neat, nice bedroom with all a soft plush bed. ",
        events: [],
        children: [],
        parent: "house"
    },
    "livingRoom": {
        title: "Living room",
        id: "livingRoom",
        description: "Your go-to place for shenanigans and hangouts.",
        events: ["searchForCoinsBedroom"],
        enemies: ["mothAndRust", "commonSloth"],
        children: [],
        parent: "house"
    },
    "templeJerusalem":{
        title: "Temple of Jerusalem",
        id: "templeJersualem",
        description: "The great temple of Jerusalem looms above you. The rich smell of incense overwhelms your senses",
        events: ["donatingMoneyTemple"],
        children:[],
        parent: "world"
    },
    "fieldOfBoaz":{
        title: "Field of Boaz",
        id: "fieldOfBoaz",
        description: "",
        events: ["gotBarleyFieldOfBoaz"],
        children:[],
        parent: "world"
    }
   
};
