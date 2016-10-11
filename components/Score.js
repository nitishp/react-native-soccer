import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';

class Score extends Component {

    constructor(props) {
        super(props);
        this.animationConfig = {
            toValue: 1.0,
            friction: 50,
            tension: 1000,
        }
        this.state = {
            bounceValue : new Animated.Value(0),
        }
    }

    render() {
        let windowWidth = Dimensions.get('window').width;
        let containerPosition = {
            top: this.props.y,
            width: windowWidth,
            transform: [
                {scale: this.state.bounceValue},
            ],
        }

        return (
            <Animated.View style={[styles.container, containerPosition]}>
                <Text style={styles.score}>
                    {this.props.score}
                </Text>
            </Animated.View>
        );
    }

    componentDidUpdate() {
        if(this.props.scored === true) {
            this.bounce();
        }
    }

    componentDidMount() {
        this.bounce();
    }

    bounce() {
        Animated.spring(this.state.bounceValue, this.animationConfig).stop();
        this.state.bounceValue.setValue(0.5);
        Animated.spring(this.state.bounceValue, this.animationConfig).start();
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    score: {
        fontSize: 100,
        fontWeight: '100',
        flex: 1,
    }
});

export default Score;
