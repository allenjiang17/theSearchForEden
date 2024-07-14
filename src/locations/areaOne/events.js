
export const AreaOneEvents = [
    {
        title: "Beginnings",
        description: "You wake up, and you feel strange. Something like scales falls from your eyes, and it is as if you can see for the first time. Everything that felt familiar to you now feels distant. Your thinking still feels futile, and your foolish heart still feels darkened. But you have this sense that eternity has been set on your heart. And it calls to you to go from your country, your people, and your father’s household, and to a new land.",
        actions: [{
            name: "Begin your adventure",
            actionType: "setLocation",
            params: [1]
        }]
    },
    {
        title: "Donating Money ",
        description: "You approach the Temple of Jerusalem, and you see many rich people putting their gifts into the temple treasury. What would you like to do?",
        actions: [
            {
                name: "Put two coins in the treasury",
                actionType: null,
                params: null
            }, 
            {
                name: "Put three coins in the treasury",
                actionType: null,
                params: null
            }, 
        ]
    },
    {
        title: "Got Barley? ",
        description: "You see a large field of barley with many harvesters. A kind man walks up to you and tells you that you may follow along his laborers and glean some of his barley for free. You thank him and glean a bundle of barley.",
        actions: []

    },
]