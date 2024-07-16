import React from 'react'
import ReactDOM from 'react-dom/client'
import Game from './game.jsx'
import {enableMapSet} from "immer"

enableMapSet();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
)
