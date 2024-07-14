
//TODO: change this to a more efficient tree structure, instead of this
export const AreaOneLocations = [
    {
        title: "Beginning",
        event: 0,
        children:[]
    },
    {
        title: "World",
        description: "This is the great big world. You take a deep breath and look around. Where should you go?",
        event: null,
        children: [2, 3],
        parent: null
    },
    {
        title: "Temple of Jerusalem",
        description: "The great temple of Jerusalem looms above you. The rich smell of incense overwhelms your senses",
        event: 1,
        children:[],
        parent: 1
    },
    {
        title: "Field of Boaz",
        dscription: "",
        event: 2,
        children:[],
        parent: 1
    }
   
]
