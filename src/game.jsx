
import './App.css'
import MainBody from './components/mainBody.jsx'
import NavBar from './components/navBar.jsx';
import { createContext, useState, useEffect } from 'react';


export const GameContext = createContext();

//this will be set by the user in the future
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
  money: 0,
  keyItems: [],
  items: new Map(),
  equipment: [],
  weapons: []
}

const initialCharCondition = {
  hp: 100,
  spiritualHp: 100,
  states: [],
  weapon: [],
  equipment: {
    head: null,
    body: null,
    hands: null,
    trinkets: []
  }
}

function checkLocal(obj) {
  return(!(localStorage.getItem(obj) === null))
}
function getLocal(obj) {
  return(JSON.parse(localStorage.getItem(obj)))
}
function useStateLocal(obj, initialval = null) {
  if(!(localStorage.getItem(obj) === null)) {
    console.log(obj + " : " + getLocal(obj));
  }
  return(useState(checkLocal(obj) ? getLocal(obj) : initialval))
}
function effectHook(objname, obj) {
  useEffect(() => {
    localStorage.setItem(objname, JSON.stringify(obj));
  }, [obj]);
}


function Game() {
  // const [currentEvent, setCurrentEvent] = useStateLocal("currentEvent", null)
  const [currentEvent, setCurrentEvent] = useState(null)
  // effectHook("currentEvent", currentEvent);
  // const [location, setLocation] = useStateLocal("location", "beginning")
  const [location, setLocation] = useState("beginning")
  // effectHook("location", location);
  const [character, setCharacter] = useStateLocal("character", initialCharacterTest)
  effectHook("character", character);
  const [inventory, setInventory] = useStateLocal("inventory", initialInventory)
  effectHook("inventory", inventory);

  const [charCondition, setCharCondition] = useStateLocal("charCondition", initialCharCondition);
  effectHook("charCondition", charCondition);

  const [ntask, setNtask] = useStateLocal("ntask", 24);
  effectHook("ntask", ntask);
  const [day, setDay] = useStateLocal("day", 0);
  effectHook("day", day);

  const [page, setPage] = useStateLocal("map", "map");
  effectHook("page", page);

  return (
    <GameContext.Provider value ={{
      currentEvent, setCurrentEvent, 
      location, setLocation, 
      character, setCharacter, 
      inventory, setInventory, 
      charCondition, setCharCondition, 
      ntask, setNtask,
      day, setDay}}>
      <div className="flex flex-col justify-start items-start w-full max-w-[1000px] mx-auto p-8 gap-5">
        <NavBar setPage={setPage}/>
        <MainBody page={page}/>
      </div>
    </GameContext.Provider>
  )
}

export default Game;
