import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground, Text} from 'react-native';
import Svg, {Polygon} from 'react-native-svg';

import DraggableDot from './src/components/DraggableDot/DraggableDot';
import beautifulImage from './src/assets/beautiful-place.jpg';

export default class SingleScreenApp extends Component {
    state = {
        polygonPoints: [ [104, 36], [216,83], [208,170], [80,140] ],
        polygonCornerRadius: 10,
        pressedCorner : -1
    }

    constructor(props) {
        super(props);
        console.log("in SingleScreenApp constructor(props)")
    }

    render() {
        console.log("in SingleScreenApp.render method")
        return (
            <View style={styles.mainContainer}>
                <Text>Testing this</Text>
                <ImageBackground source={beautifulImage} style={styles.placeImage}>
                    <DraggableDot 
                        cx={this.state.polygonPoints[0][0]} 
                        cy={this.state.polygonPoints[0][1]}
                    />
                    <DraggableDot 
                        cx={this.state.polygonPoints[1][0]} 
                        cy={this.state.polygonPoints[1][1]}
                    />
                    <DraggableDot 
                        cx={this.state.polygonPoints[2][0]} 
                        cy={this.state.polygonPoints[2][1]}
                    />
                    <DraggableDot 
                        cx={this.state.polygonPoints[3][0]} 
                        cy={this.state.polygonPoints[3][1]}
                    />
                    <Svg width="100%" height="100%">
                        <Polygon
                            points={this.state.polygonPoints}
                            fill="#000"
                            fillOpacity="0"
                            stroke="white"
                            strokeWidth="3"
                            strokeDasharray="8, 3"
                        />
                    </Svg>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    placeImage: {
        width: 300,
        height: 300
    },
    mainContainer: {
        paddingTop: 50,
        width: 300,
        flex: 1,
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "red"
    }
});


