export const AreaOneEnemies = {
    "mothAndRust": {
        name: "Moth and Rust",
        type: "physical",
        encounterRate: 1,
        description: "You encounter Moth and Rust! Seems like they are out to destroy your treasures. You don’t really have that many treasures to begin with, but you figure that this could be as good of an opportunity as any to build up your Strength and Defense stats.",
        hp: 10,
        attack: 1,
        defense: 1,
        statReward: [
            {stat: "strength", amount: 1, chance: 0.5},
            {stat: "defense", amount: 1, chance: 0.5},
        ],
        itemDrop: [
            {item: "chewedUpGarments", chance: 0.5}
        ]
    }, 
    "commonSloth": {
        name: "Common Sloth",
        encounterRate: 1,
        type: "spiritual",
        description: "You encounter Common Sloth! It says to you, “Seems like you have a lot of work to do. Why don’t you just sleep your problems away?” You’re not sure why tropical mammals are hanging out in your house, but it seems like they want to put up a fight! This seems like a good opportunity to build up your Zeal and Resilience stats.",
        hp: 12,
        attack: 1,
        defense: 1,
        statReward: [
            {stat: "zeal", amount: 1, chance: 0.5},
            {stat: "resilience", amount: 1, chance: 0.5},
        ],
        itemDrop: [
            {item: "capturedEnergy", chance: 0.25}
        ]
    }
}