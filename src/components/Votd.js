import React from 'react';
import './Votd.css';

const moment = require('moment-timezone');

export default class Votd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verseText: "Loading...",
            verseRef: "Bible.com",
            verseUrlRef: "https://www.bible.com",
            day: 0
        }
        this.getVerse = this.getVerse.bind(this);
    }

    getVerse() {
        var dayOfTheYear = moment().dayOfYear();
        if (this.state.day !== dayOfTheYear) {
            var url = 'https://developers.youversionapi.com/1.0/verse_of_the_day/' + dayOfTheYear + '?version_id=1';
            const otherParam = {
                headers: {
                    "Accept": "application/json",
                    "X-YouVersion-Developer-Token" : process.env.REACT_APP_YOUVERSION_TOKEN
                }
            }
            // fetch(url, otherParam)
            //     .then((response) => response.json())
            //     .then((response) => {
            //         this.setState({ verseText: response.verse.text });
            //         this.setState({ verseRef: response.verse.human_reference });
            //         this.setState({ verseUrlRef: response.verse.url });
            //         this.setState({ day : dayOfTheYear });
            //     })
            //     .catch((error) => console.error(error));
                    this.setState({ verseText: "And being found in fashion as a man, he humbled himself, and became obedient unto death, even the death of the cross." });
                    this.setState({ verseRef: "Philippians 2:8" });
                    this.setState({ verseUrlRef: "url" });
                    this.setState({ day : 106 });
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
            // localStorage.setItem(key, JSON.stringify());
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
            this.getVerse();
        }
    }

    render() {
        return (
            <div className="Votd">
                <div className="Votd-text">{this.state.verseText}</div>
                <a className="Votd-url-ref" href={this.state.verseUrlRef}>
                    <div className="Votd-ref">{this.state.verseRef}</div>
                </a>
            </div>
        )
    }
}
