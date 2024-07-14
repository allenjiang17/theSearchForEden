
import './App.css'
import MainBody from './components/mainBody.jsx'
import NavBar from './components/navBar.jsx';
import { createContext, useState } from 'react';


export const GameContext = createContext();


function Game() {

  //future get from local storage
  const [location, setLocation] = useState(0); 
  const [character, setCharacter] = useState(null); 
  const [inventory, setInventory] = useState([]);
  const [ntask, setNtask] = useState(24);
  // const [day, setDay] = useState({day: 0, date: new Date()});
  const [day, setDay] = useState(0);

  return (<GameContext.Provider value={{
          location, setLocation,
          character, setCharacter,
          inventory, setInventory,
          ntask, setNtask,
          day, setDay
          }}>
    <div className="flex flex-col justify-start items-start w-full max-w-[1000px] mx-auto p-8 gap-5">
      <NavBar/>
      <MainBody/>
    </div>
  </GameContext.Provider>)
}

export default Game;
