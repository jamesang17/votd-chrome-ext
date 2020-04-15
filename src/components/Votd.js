import React from 'react';
import './Votd.css';

const moment = require('moment-timezone');

export default class Votd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verseText: "Loading...",
            verseRef: "Bible.com",
            verseUrlRef: "https://www.bible.com"
        }
        this.getVerse = this.getVerse.bind(this);
    }

    getVerse() {
        var dayOfTheYear = moment().dayOfYear();
        var url = 'https://developers.youversionapi.com/1.0/verse_of_the_day/' + dayOfTheYear + '?version_id=1';
        const otherParam = {
            headers: {
                "Accept": "application/json",
                "X-YouVersion-Developer-Token" : process.env.REACT_APP_YOUVERSION_TOKEN
            }
        }
        fetch(url, otherParam)
            .then((response) => response.json())
            .then((response) => {
                this.setState({ verseText: response.verse.text });
                this.setState({ verseRef: response.verse.human_reference });
                this.setState({ verseUrlRef: response.verse.url });
            })
            .catch((error) => console.error(error));
    }

    componentDidMount() {
        this.getVerse();
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
