import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';

class Emoji extends Component {

    constructor(props) {
        super(props);
        this.scored = ['👍', '👏', '👋', '😎', '💪'];
        this.missed = ['😢', '😭', '😔', '😡', '😠'];
    }

    render() {
        let randomIndex = Math.floor(Math.random() * 5);
        let windowWidth = Dimensions.get('window').width;
        let position = {
            width: windowWidth,
            top: this.props.y
        }
        return (
            <View style={[styles.container, position]}>
                <Text style={styles.emoji}>
                    {this.scored[randomIndex]}
                </Text>
            </View>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.scored !== this.props.scored;
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    emoji: {
        flex: 1,
        fontSize: 25,
    }
});

export default Emoji;
