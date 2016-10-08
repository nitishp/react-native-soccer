import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';


const LC_IDLE = 0;
const LC_RUNNING = 1;
const LC_TAPPED = 2;
const GRAVITY = 0.6;
const TAPPED_VELOCITY = 10;

class Soccer extends Component {

    constructor(props) {
        super(props);
        this.interval = null;
        this.state = {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            lifeCycle: LC_IDLE,
        };
    }

    componentDidMount() {
        this.interval = setInterval(this.update.bind(this), 1000 / 60);
    }

    componentWillUnmount() {
        if(this.interval) {
            clearInterval(this.interval);
        }
    }

    onTap() {
        if(this.state.lifeCycle !== LC_TAPPED) {
            this.setState({
                vx: 0, // TODO: Update this to change based on the angle
                vy: TAPPED_VELOCITY,
                lifeCycle: LC_RUNNING,
            })
        }
    }

    updatePosition(nextState) {
        // TODO: Update to not go off the screen (maybe also convert to /s)
        nextState.x += nextState.vx;
        nextState.y += nextState.vy;
    }

    updateVelocity(nextState) {
        nextState.vy += GRAVITY;
    }

    update() {
        if(this.state.lifeCycle === LC_IDLE) {
            return;
        }

        let nextState = Object.assign({}, this.state);

        this.updatePosition(nextState);
        this.updateVelocity(nextState);

        this.setState(nextState);
    }

    render() {
        var position = {
            left: this.state.x,
            top: this.state.y
        }
        return (
            <Text style={position}>
                HI
            </Text>
        );
    }
}

const styles = StyleSheet.create({
});

export default Soccer;
