import React from 'react';
import './Clock.css';
const moment = require('moment-timezone');

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: moment().format("h:mm")
        }
    }

    tick() {
        this.setState({
            time: moment().format("h:mm")
        });
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        return(
            <div className="Clock">
                {this.state.time}
            </div>
        )
    }
}
