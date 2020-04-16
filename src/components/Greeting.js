import React from 'react';
import './Greeting.css';
import Name from './Name';

export default class Greeting extends React.Component {
    constructor(props) {
        super(props);

        var morning = new Date();
        morning.setHours(0);
        morning.setMinutes(0);

        var noon = new Date();
        noon.setHours(12);
        noon.setMinutes(0);

        var evening = new Date();
        evening.setHours(18);
        evening.setMinutes(0);

        this.state = {
            greeting: "",
            morning: morning,
            noon: noon,
            evening: evening
        }
    }

    getGreeting() {
        var time = Date.now();
        if (time < this.state.noon && time >= this.state.morning) {
            this.setState({ greeting: "Good morning" });
        } else if (time < this.state.evening && time >= this.state.noon) {
            this.setState({ greeting: "Good afternoon" });
        } else {
            this.setState({ greeting: "Good evening" });
        }

    }

    componentDidMount() {
        this.getGreeting();
        this.intervalID = setInterval(
            () => this.getGreeting(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        return(
            <div className="Greeting-container">
                <p className="Greeting">{this.state.greeting}</p>
                <Name />
            </div>
        )
    }
}
