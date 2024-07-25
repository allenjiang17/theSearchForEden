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
            {item: "breadOfIdleness", chance: 0.75}
        ]
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
        itemDrop: [
            {item: "waterOfMeribah", chance: 0.5}

        ]
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
        itemDrop: [           
             {item: "exStoneBread", chance: 0.5}
        ]
    },
    "ancientBoundaryStone": {
        name: "Ancient Boundary Stone",
        encounterRate: 0.5,
        type: "physical",
        description: "You encounter an Ancient Boundary Stone. It doesn\'t seem like it\'s in the right place. It\'s as if it was set up somewhere else by ancestors long ago, but somebody must have moved it here.",
        hp: 36,
        attack: 5,
        defense: 5,
        statReward: [
            {stat: "strength", amount: 1, chance: 0.5},
            {stat: "defense", amount: 1, chance: 0.5},
        ],
        itemDrop: [            
            {item: "senseOfDirection", chance: 0.3}
        ]
    },
    "commonGluttony": {
        name: "Common Gluttony",
        encounterRate: 1,
        type: "spiritual",
        description: "You encounter Common Gluttony! It yells, \"GIVE ME ALL THE FOOD! Cucumbers, melons, leeks, onions, and garlic--give them all to me!\"",
        hp: 20,
        attack: 2,
        defense: 2,
        statReward: [
            {stat: "zeal", amount: 1, chance: 0.5},
            {stat: "resilience", amount: 1, chance: 0.5},
        ],
        itemDrop: [
          {item: "timeOfFasting", chance: 0.5}
        ]
    },
    "grumblingOrgan": {
        name: "Grumbling Organ",
        encounterRate: 1,
        type: "spiritual",
        description: "You encounter a Grumbling Organ. You can't tell if it's your stomach that's grumbling or your heart's that grumbling. Either way, you're not in a good mood.",
        hp: 24,
        attack: 2,
        defense: 2,
        statReward: [
            {stat: "zeal", amount: 1, chance: 0.5},
            {stat: "resilience", amount: 1, chance: 0.5},
        ],
        itemDrop: [
          {item: "literalQuail", chance: 0.3},
          {item: "metaphoricalQuail", chance: 0.3}
        ]
    },
    "fierySerpent": {
        name: "Fiery Serpent",
        encounterRate: 1,
        type: "physical",
        description: "You encounter a Fiery Serpent. Watch out! These serpents specialize in biting grumbling people.",
        hp: 36,
        attack: 3,
        defense: 3,
        statReward: [
            {stat: "strength", amount: 1, chance: 0.5},
            {stat: "defense", amount: 1, chance: 0.5},
        ],
        itemDrop: [
          {item: "serpentTeeth", chance: 0.2},
          {item: "serpentSkin", chance: 0.8},
          {item: "serpentGuts", chance: 0.2},
          {item: "serpentEyes", chance: 0.2}
        ]
    },
    "greatFear": {
        name: "Great Fear",
        encounterRate: 1,
        type: "spiritual",
        description: "You encounter a Great Fear. Legend has it that long ago, this spirit seized a crowd of people that was being chased down by an army of chariots. It continues to terrorize people today.",
        hp: 100,
        attack: 8,
        defense: 8,
        statReward: [
            {stat: "zeal", amount: 1, chance: 1},
            {stat: "resilience", amount: 1, chance: 1},
        ],
        itemDrop: [
          {item: "imperfectLovePotion", chance: 1}
        ]
    },
    "meaninglessOffering": {
        name: "Meaningless Offering",
        encounterRate: 1,
        type: "spiritual",
        description: "You encounter a Meaningless Offering. It invites you to give offerings while neglecting the more important matters of the law--justice, mercy, and faithfulness.",
        hp: 60,
        attack: 6,
        defense: 6,
        statReward: [
            {stat: "zeal", amount: 1, chance: 0.5},
            {stat: "resilience", amount: 1, chance: 0.5},
        ],
        itemDrop: [
          {item: "herdOfGoats", chance: 1}
        ]
    },
    "worthlessAssembly": {
        name: "Worthless Assembly",
        encounterRate: 1,
        type: "spiritual",
        description: "You encounter a Worthless Assembly. It invites you to come near to God with your mouth and honor him with your lips, but to keep your hearts are far from him.",
        hp: 60,
        attack: 6,
        defense: 6,
        statReward: [
            {stat: "zeal", amount: 1, chance: 0.5},
            {stat: "resilience", amount: 1, chance: 0.5},
        ],
        itemDrop: [
          {item: "flockOfSheep", chance: 1}
        ]
    },
    "handOfBlood": {
        name: "Hand of Blood",
        encounterRate: 1,
        type: "spiritual",
        description: "You encounter a Hand of Blood. This enemy prevents God from listening to a Hand of Prayer.",
        hp: 70,
        attack: 7,
        defense: 7,
        statReward: [
            {stat: "zeal", amount: 1, chance: 0.5},
            {stat: "resilience", amount: 1, chance: 0.5},
        ],
        itemDrop: [
          {item: "handOfPrayer", chance: 0.5}
        ]
    },
    "commonPride": {
        name: "Common Pride",
        encounterRate: 1,
        type: "spiritual",
        description: "You encounter Common Pride! It looks arrogant, overfed, and unconcered. It cares not for the poor and the needy.",
        hp: 60,
        attack: 6,
        defense: 6,
        statReward: [
            {stat: "zeal", amount: 1, chance: 0.5},
            {stat: "resilience", amount: 1, chance: 0.5},
        ],
        itemDrop: [
          {item: "healthyDoseOfHumility", chance: 0.5}
        ]
    }
}