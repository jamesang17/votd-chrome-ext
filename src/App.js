import React from 'react';
import './App.css';
import Votd from './components/Votd';
import Clock from './components/Clock';
import Greeting from './components/Greeting';
import { Fade } from '@material-ui/core';

function App() {
  return (
    <Fade in={true} timeout={1000}>
    <div className="App">
      <div className="App-main">
        <div className="Time-container">
            <Clock className="Time-component"/>
            <Greeting className="Time-component"/>
        </div>
        <div className="Votd">
            <Votd />
        </div>
      </div>
    </div>
    </Fade>
  );
}

export default App;
