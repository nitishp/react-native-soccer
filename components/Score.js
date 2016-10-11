import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';

class Score extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let windowWidth = Dimensions.get('window').width;
        let containerPosition = {
            top: this.props.y,
            width: windowWidth,
        }

        return (
            <View style={[styles.container, containerPosition]}>
                <Text style={styles.score}>
                    {this.props.score}
                </Text>
            </View>
        );
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
