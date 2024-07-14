
import './App.css'
import MainBody from './components/mainBody.jsx'
import NavBar from './components/navBar.jsx';
import { createContext, useState } from 'react';


export const GameContext = createContext();


function Game() {

  const [location, setLocation] = useState(0); //future get from local storage
  const [character, setCharacter] = useState(null); 

  return (

  <GameContext.Provider value ={{location, setLocation, character, setCharacter}}>
    <div className="flex flex-col justify-start items-start w-full max-w-[1000px] mx-auto p-8 gap-5">
      <NavBar/>
      <MainBody/>
    </div>
    </GameContext.Provider>
  )
}

export default Game;
