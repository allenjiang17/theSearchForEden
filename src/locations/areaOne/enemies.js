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
        itemDrop: ["chewedUpGarments"]
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
        itemDrop: ["capturedEnergy"]
    },
    "waterStone": {
        name: "Water Stone",
        encounterRate: 1,
        type: "physical",
        description: "You encounter a Water Stone! There must be a way to get water out of this stone somehow. You wonder momentarily if you should speak to it or strike it.",
        hp: 20,
        attack: 2,
        defense: 2,
        statReward: [
            {stat: "strength", amount: 1, chance: 0.5},
            {stat: "defense", amount: 1, chance: 0.5},
        ],
        itemDrop: ["waterOfMeribah"]
    },
    "breadStone": {
        name: "Bread Stone",
        encounterRate: 1,
        type: "physical",
        description: "You encounter a Bread Stone! This used to be a regular stone, but one day somebody came along, and they were so hungry that they turned this stone into bread! So is this actually a bread or a stone? Nobody knows.",
        hp: 24,
        attack: 2,
        defense: 2,
        statReward: [
            {stat: "strength", amount: 1, chance: 0.5},
            {stat: "defense", amount: 1, chance: 0.5},
        ],
        itemDrop: ["exStoneBread"]
    },
    "ancientBoundaryStone": {
        name: "Ancient Boundary Stone",
        encounterRate: 1,
        type: "physical",
        description: "You encounter an Ancient Boundary Stone. It doesn\'t seem like it\'s in the right place. It\'s as if it was set up somewhere else by ancestors long ago, but somebody must have moved it here.",
        hp: 36,
        attack: 3,
        defense: 3,
        statReward: [
            {stat: "strength", amount: 1, chance: 0.5},
            {stat: "defense", amount: 1, chance: 0.5},
        ],
        itemDrop: ["senseOfDirection"]
    }
}