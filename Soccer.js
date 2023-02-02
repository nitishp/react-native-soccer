import React, {Component} from 'react';
import {View,Text, StyleSheet,Dimensions,Image,Modal,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import * as Haptics from 'expo-haptics';
import Score from './components/Score';
import Emoji from './components/Emoji';
import * as All  from './images';

const LC_IDLE = 0;
const LC_RUNNING = 1;
const LC_TAPPED = 2;
const GRAVITY = 0.6;
const TAPPED_VELOCITY = 20;
const ROTATION_FACTOR = 7;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const BALL_WIDTH = SCREEN_WIDTH * 0.33;
const BALL_HEIGHT = SCREEN_WIDTH * 0.33;
const FLOOR_Y = SCREEN_HEIGHT - BALL_HEIGHT;
const FLOOR_X = SCREEN_WIDTH / 2;
const SCORE_Y = SCREEN_HEIGHT / 6;
const EMOJI_Y = SCREEN_HEIGHT / 3;
const sports = ['soccer', 'baseball', 'basketball', 'football', 'golf', 'tennis', 'hockey']

function Sports({sport, set}) {
    return (
        <TouchableOpacity onPress={()=> set(sport)}>
        <Image style={{width: Dimensions.get('window').width * 0.3, height: Dimensions.get('window').width * 0.3, marginBottom: 15}} source={All[`${sport}`]}/>
        </TouchableOpacity>
    )
}

class Soccer extends Component {
    constructor(props) {
        super(props);
        this.interval = null;
        this.state = {
            x: FLOOR_X,
            y: FLOOR_Y,
            vx: 0,
            vy: 0,
            lifeCycle: LC_IDLE,
            score: 0,
            scored: false,
            lost: false,
            rotate: 0,
            sport: All.soccer,
            visible: true,
            button: true
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

    onTap(event) {
        Haptics.selectionAsync()
        this.setState({button: false})
        if(this.state.lifeCycle === LC_TAPPED) {
            this.setState({
                lifeCycle: LC_RUNNING,
                scored: false,
            });
        }
        else {
            let centerX = BALL_WIDTH / 2;
            let centerY = BALL_HEIGHT / 2;
            let velocityX = ((centerX - event.locationX) / SCREEN_WIDTH) * TAPPED_VELOCITY;
            let velocityY = -TAPPED_VELOCITY;
            this.setState({
                vx: velocityX,
                vy: velocityY,
                score: this.state.score + 1,
                lifeCycle: LC_TAPPED,
                scored: true,
                lost: false,
            });
        }
        return false;
    }

    updatePosition(nextState) {
        nextState.x += nextState.vx;
        nextState.y += nextState.vy;
        nextState.rotate += ROTATION_FACTOR * nextState.vx;
        // Hit the left wall
        if(nextState.x < BALL_WIDTH / 2) {
            Haptics.selectionAsync()
            nextState.vx = -nextState.vx;
            nextState.x = BALL_WIDTH / 2;
        }
        // Hit the right wall
        if(nextState.x > SCREEN_WIDTH - BALL_WIDTH / 2) {
            Haptics.selectionAsync()
            nextState.vx = -nextState.vx;
            nextState.x = SCREEN_WIDTH - BALL_WIDTH / 2;
        }
        // Reset after falling down
        if(nextState.y > SCREEN_HEIGHT + BALL_HEIGHT) {
            Haptics.selectionAsync()
            nextState.y = FLOOR_Y;
            nextState.x = FLOOR_X;
            nextState.lifeCycle = LC_IDLE;
            nextState.score = 0;
            nextState.lost = true;
            nextState.scored = false;
        }
    }

    updateVelocity(nextState) {
        nextState.vy += GRAVITY;
    }

    update() {
        if(this.state.lifeCycle === LC_IDLE) {
            this.setState({button: true})
            return;
        }
        let nextState = Object.assign({}, this.state);
        this.updatePosition(nextState);
        this.updateVelocity(nextState);
        this.setState(nextState);
    }

    setSport(sport){
        Haptics.selectionAsync()
        this.setState({visible: false, sport: All[`${sport}`]})
    }

    render() {
        var position = {
            left: this.state.x - (BALL_WIDTH / 2),
            top: this.state.y - (BALL_HEIGHT / 2),
        }
        var rotation = {
            transform: [
                {rotate: this.state.rotate + 'deg'},
            ],
        }
        return (
            <View>
                <Score score={this.state.score} y={SCORE_Y} scored={this.state.scored}/>
                <Emoji scored={this.state.scored} y={EMOJI_Y} lost={this.state.lost}/>
                <TouchableWithoutFeedback style={{padding: 20}}
                onPress={(event) => this.onTap(event.nativeEvent)}
                        onPressIn={(event) => this.onTap(event.nativeEvent)}
                        onPressOut={(event) => this.onTap(event.nativeEvent)}>
                            <Image source={this.state.sport} style={[styles.ball, position, rotation]}/>
                        </TouchableWithoutFeedback>
                        <Modal animationType='slide' presentationStyle='formSheet' visible={this.state.visible}>
                        <View style={{ alignItems: "center", marginTop: Dimensions.get('window').height * 0.2}}>
                            <Text style={{fontSize: "40", fontWeight: "200", marginBottom: 20}}>
                                Choose your sport
                            </Text>
                            <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent:"space-evenly"}}>
                            {sports.map(sport => {return <Sports key={sport} set={() => this.setSport(sport)} sport={sport} /> })}
                            </View>
                        </View>
                        </Modal>
                        {this.state.button == true && <TouchableOpacity onPressIn={()=> {this.setState({visible: true}), Haptics.selectionAsync()}} 
                        style={{padding: 10, height: 55, width: 55, position: 'absolute', bottom: 30, right: 30, borderColor: '#e7e7e6', borderWidth: 0.5, shadowColor: "#555a74", 
              shadowOffset: { height: 0.5, width: 0.5 }, 
              shadowOpacity: 0.5, 
              shadowRadius: 0.5, 
              backgroundColor: "white",
              borderRadius: 5,
              elevation: 8, 
              justifyContent: 'center',
              alignItems: 'center'}}><Image style={{height: 50, width: 50}} source={require('./images/sportballs.png')}/></TouchableOpacity>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ball: {
        width: BALL_WIDTH,
        height: BALL_HEIGHT,
    },
});

export default Soccer;
