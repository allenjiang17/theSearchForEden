
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
  states: []
}

function Game() {

  const [currentEvent, setCurrentEvent] = useState(null);
  const [location, setLocation] = useState("beginning"); //future get from local storage
  const [character, setCharacter] = useState(initialCharacterTest); 
  const [inventory, setInventory] = useState(initialInventory);

  const [charCondition, setCharCondition] = useState(initialCharCondition);

  const [ntask, setNtask] = useState(24);
  // const [day, setDay] = useState({day: 0, date: new Date()});
  const [day, setDay] = useState(0);

  const [page, setPage] = useState("map");



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
  </GameContext.Provider>)
}

export default Game;
