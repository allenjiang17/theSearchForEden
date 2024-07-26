import {produce} from "immer";

export const LogosDictionary = {
    "basicSpiritualAttack": {
        id: "basicSpiritualAttack",
        logos: "Fight the good fight of the faith",
        type: "attack", 
        basePower: 10,
    },
    "basicPhysicalAttack": {
        id: "basicPhysicalAttack",
        logos: "Be strong and courageous for the Lord your God will be with you wherever you go.",
        type: "attack", 
        basePower: 10,
    },
    "basicBuff": {
        id: "basicBuff",
        logos: "Praise be to the LORD my Rock, who trains my hands for war, my fingers for battle.",
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
        logos: "He heals the brokenhearted and binds up their wounds.",
        type: "heal", 
        basePower: 10,
    }
}