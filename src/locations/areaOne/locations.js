
//TODO: change this to a more efficient tree structure, instead of this
export const AreaOneLocations = [
    {
        title: "Beginning",
        id: 1,
        event: 0,
        children:[]
    },
    {
        title: "World",
        id: 2,
        description: "This is the great big world. You take a deep breath and look around. Where should you go?",
        event: null,
        children: [2, 5, 6],
        parent: null
    },
    {
        title: "Your House",
        id: 3,
        description: "This is your humble abode. ",
        event: null,
        children: [3, 4],
        parent: 1
    },
    {
        title: "Bedroom",
        id: 4,
        description: "A neat, nice bedroom with all a soft plush bed. ",
        event: null,
        children: [],
        parent: 2
    },
    {
        title: "Living room",
        id: 5,
        description: "Your go-to place for shenanigans and hangouts.",
        event: 7,
        children: [],
        parent: 2
    },
    {
        title: "Temple of Jerusalem",
        id: 6,
        description: "The great temple of Jerusalem looms above you. The rich smell of incense overwhelms your senses",
        event: 1,
        children:[],
        parent: 1
    },
    {
        title: "Field of Boaz",
        id: 7,
        description: "",
        event: 5,
        children:[],
        parent: 1
    }
   
]
