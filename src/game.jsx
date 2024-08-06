
import './App.css'
import MainBody from './components/mainBody.jsx'
import NavBar from './components/navBar.jsx';
import BottomBar from './components/bottomBar.jsx';
import { AreaOneLocations } from './locations/areaOne/locations.js';
import { createContext, useState, useEffect } from 'react';
import { QuestsDict } from './locations/quests.js';
import { produce } from 'immer';


export const GameContext = createContext();

// We should move all of the defaults into a separate file
// this will be set by the user in the future
const initialCharacterTest = {
  name: "username",
  class: "seeker",
  level: 1,
  stats: {
    hp: 100,
    strength: 1,
    defense:1,
    spiritualHp: 100,
    zeal: 1,
    resilience:1,
  },
  incantations: ["basicAttack", "basicBuff", "basicHeal"],
};

const initialInventory = {
  money: 30,
  keyItems: [],
  items: {"chewedUpGarments": 12, "figLeaf": 12, "serpentEyes": 1, "serpentTeeth": 1, "serpentTaxidermy": 1},
  equipment: [],
  weapons: []
}

const initialCharCondition = {
  hp: 100,
  spiritualHp: 100,
  states: [],
  statEffects: {
    hp: 0,
    strength: 0,
    defense: 0,
    spiritualHp: 0,
    zeal: 0,
    resilience: 0
  },
  weapon: null,
  equipment: {
    head: null,
    body: null,
    hands: null,
    trinkets: []
  }
};


//this holds the map state as experienced by the player -- distinct from the static data in locations.js
let initialMap = {};
Object.keys(AreaOneLocations).forEach((location)=>{
  initialMap[location] = {
    unlocked: AreaOneLocations[location].initialUnlocked ?? false,
    state: "default", //potential different variations of the location
    currentEvent: null

  }
})

console.log(initialMap);

function checkLocal(obj) {
  return(!(localStorage.getItem(obj) === null))
}
function getLocal(obj) {
  return(JSON.parse(localStorage.getItem(obj)))
}
function useStateLocal(obj, initialval = null) {
  return(useState(checkLocal(obj) ? getLocal(obj) : initialval))
}
function effectHook(objname, obj) {
  useEffect(() => {
    localStorage.setItem(objname, JSON.stringify(obj));
  }, [obj]);
}


function Game() {

  const [location, setLocation] = useStateLocal("location", "beginning")
  //const [location, setLocation] = useState("beginning")
  effectHook("location", location);

  const [map, setMap] = useStateLocal("map", initialMap);
  effectHook("map", map);

  const [character, setCharacter] = useStateLocal("character", initialCharacterTest)
  effectHook("character", character);
  const [inventory, setInventory] = useStateLocal("inventory", initialInventory)
  effectHook("inventory", inventory);
  const [charCondition, setCharCondition] = useStateLocal("charCondition", initialCharCondition);
  effectHook("charCondition", charCondition);

  const [quests, setQuests] = useStateLocal("quests", {});
  effectHook("quests", quests);

  const [settings, setSettings] = useStateLocal("settings", {
      music: true,
      volume: 30,
      bgm: 'NothingButTheBlood'
  });
  effectHook("settings", settings);

  const MAXTASK = 36;
  const [ntask, setNtask] = useStateLocal("ntask", MAXTASK);
  effectHook("ntask", ntask);
  const taskFunc = {
      "set": setNtask,
      "sleep": () => setNtask(MAXTASK),
      "check": (cost = 1) => (ntask >= cost),
      "use": (cost = 1) => (setNtask(ntask - cost)),
  }
  
  const [day, setDay] = useStateLocal("day", 0);
  effectHook("day", day);

  const [page, setPage] = useStateLocal("page", "map");
  effectHook("page", page);

  //TODO: feels clunky but the only way to check quests that have inventory satisfaction conditions
  /*
  useEffect(() => {
    for (let quest of Object.keys(quests)) {
      if (quest.progress !== "complete" && QuestsDict[quest].conditionType === "inventory") {
        QuestsDict[quest].conditionFunc({inventory, setInventory, map, setMap, quests, setQuests});
      }
    } 
  }, [inventory])
  */

  return (
    <GameContext.Provider value ={{
      location, setLocation, 
      map, setMap,
      character, setCharacter, 
      inventory, setInventory, 
      quests, setQuests,
      charCondition, setCharCondition, 
      settings, setSettings,
      ntask, taskFunc,
      day, setDay,
    }}>
      <div className="flex flex-col justify-start items-start whitespace-pre-wrap w-full max-w-[1000px] mx-auto p-8 gap-5">
        <NavBar setPage={setPage}/>
        <MainBody page={page} settings={settings}/>
        <BottomBar/>
      </div>
    </GameContext.Provider>
  )
}

export default Game;
