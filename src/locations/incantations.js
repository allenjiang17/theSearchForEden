import {produce} from "immer";

export const IncantationsDictionary = {
    "basicAttack": {
        id: "basicAttack",
        title: "The Good Fight",
        incantation: "Fight the good fight of the faith",
        type: "attack", 
        basePower: 10,
    },
    "basicAttackTest": {
        id: "basicAttackTest",
        title: "The Good Fight Test",
        incantation: "Fight the good fight of the faith TEST",
        type: "attack", 
        basePower: 15,
    },
    "basicBuff": {
        id: "basicBuff",
        title: "Trained for War",
        incantation: "Praise be to the LORD my Rock, who trains my hands for war, my fingers for battle.",
        type: "buff", 
        message: "You gained +5 Attack and +5 Defense",
        func: (gameState) => {
            gameState.setCharCondition(produce((charCondition)=>{
                charCondition.statEffects.attack = 5;
                charCondition.statEffects.defense = 5;
            }));  
        }
    },
    "basicHeal": {
        id: "basicHeal",
        title: "Basic Heal",
        incantation: "He heals the brokenhearted and binds up their wounds.",
        type: "heal", 
        basePower: 10,
    }
}