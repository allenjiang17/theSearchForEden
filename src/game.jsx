
import './App.css'
import MainBody from './components/mainBody.jsx'
import NavBar from './components/navBar.jsx';
import { AreaOneLocations } from './locations/areaOne/locations.js';
import { createContext, useState, useEffect } from 'react';


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

  }
};

const initialInventory = {
  money: 3,
  keyItems: [],
  items: {"chewedUpGarments": 5},
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
    state: "default",
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

  const [settings, setSettings] = useStateLocal("settings", {
    music: true
  })

  const [ntask, setNtask] = useStateLocal("ntask", 18);
  effectHook("ntask", ntask);
  const [day, setDay] = useStateLocal("day", 0);
  effectHook("day", day);

  const [page, setPage] = useStateLocal("page", "map");
  effectHook("page", page);

  console.log(page);

  return (
    <GameContext.Provider value ={{
      location, setLocation, 
      map, setMap,
      character, setCharacter, 
      inventory, setInventory, 
      charCondition, setCharCondition, 
      settings, setSettings,
      ntask, setNtask,
      day, setDay}}>
      <div className="flex flex-col justify-start items-start w-full max-w-[1000px] mx-auto p-8 gap-5">
        <NavBar setPage={setPage}/>
        <MainBody page={page} settings={settings}/>
      </div>
    </GameContext.Provider>
  )
}

export default Game;
