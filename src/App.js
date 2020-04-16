import React from 'react';
import './App.css';
import Votd from './components/Votd';
import Clock from './components/Clock';
import Greeting from './components/Greeting';
import { Fade } from '@material-ui/core';

const moment = require('moment-timezone');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            background: "",
            day: 0
        }
    }

    getBackgroundImage() {
        var dayOfTheYear = moment().dayOfYear();
        if (this.state.day !== dayOfTheYear) {
            var url = 'https://source.unsplash.com/collection/152630/1600x900/';
            fetch(url)
                .then((response) => {
                    this.setState({ background: response["url"] });
                    this.setState({ day : dayOfTheYear });
                })
                .catch((error) => console.error(error));
        }
    }

    hydrateStateWithLocalStorage() {
        for (let key in this.state) {
            if (localStorage.hasOwnProperty(key)) {
                // get the key's value from localStorage
                let value = localStorage.getItem(key);
                // parse the localStorage string and setState
                try {
                    value = JSON.parse(value);
                    this.setState({ [key]: value });
                } catch (e) {
                    // handle empty string
                    this.setState({ [key]: value });
                }
            }
        }
    }

    saveStateToLocalStorage() {
        // for every item in React state
        for (let key in this.state) {
            // save to localStorage
            localStorage.setItem(key, JSON.stringify(this.state[key]));
      }
    }

    componentDidMount() {
        this.hydrateStateWithLocalStorage();

        // add event listener to save state to localStorage
        // when user leaves/refreshes the page
        window.addEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
    }

    componentDidUpdate(prevState) {
        if (prevState.day !== this.state.day) {
            this.getBackgroundImage();
        }
    }

    render() {
        return (
            <Fade in={true} timeout={1000}>
                <div className="App" style={{ backgroundImage: `url(${this.state.background})` }}>
                    <div className="App-main">
                        <div className="Time-container">
                            <Clock className="Time-component"/>
                            <div className="Time-component">
                                <Greeting />
                            </div>
                        </div>
                        <div className="Votd">
                            <Votd />
                        </div>
                    </div>
                    <div className="Credits">
                        Credits:
                        <a href="https://youversion.com/" target="_blank" rel="noopener noreferrer">YouVersion</a>,
                        <a href="https://unsplash.com/collections/162213/long-exposure" target="_blank" rel="noopener noreferrer"> Unsplash</a>
                    </div>
                    <div className="Source-ref">
                        Source: 
                        <a href="https://github.com/jamesang17/votd-chrome-ext" target="_blank" rel="noopener noreferrer" >@jamesang17</a>
                    </div>
                </div>
            </Fade>
    )};
}

export default App;
