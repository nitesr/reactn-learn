import React, {Component} from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Text, TouchableWithoutFeedback } from 'react-native';

import Svg, {Polygon, Circle} from 'react-native-svg'

import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons'

import {deletePlace} from '../../store/actions/index'
import DraggableCorner from './DraggableCorner'

class PlaceDetail extends Component {
    state = {
        polygonPoints: [ [104, 36], [216,83], [208,170], [80,140] ],
        polygonCornerRadius: 10,
        pressedCorner : -1
    }

    placeDeleteHandler = () => {
        this.props.onDeletePlace(this.props.place.key)
        this.props.navigator.pop();
    }

    cornerPressIn = (corner, event) => {
        this.setState((prevState)=> {
            return {
                ...prevState,
                pressedCorner: corner
            }
        })
        console.log("in cornerPressIn: pressedCorner:", this.state.pressedCorner)
    }

    cornerPressOut = (corner, event) => {
        const cornerPos = [event.nativeEvent.locationX, event.nativeEvent.locationY]
        this.setState((prevState) => {
            let newPolygonPoints = prevState.polygonPoints
            newPolygonPoints[corner] = cornerPos
            return {
                ...prevState,
                pressedCorner: -1,
                polygonPoints: newPolygonPoints
            }
        })
        console.log("in cornerPressOut: pressedCorner:", this.state.pressedCorner)
    }

    imageTouchHandler = (circlePos, event) => {
        console.log(event)
        console.log(circlePos)
        console.log(event.nativeEvent.locationX, ",", event.nativeEvent.locationY)
        console.log(this.pointInCircle(this.state.polygonPoints[circlePos], this.state.polygonCornerRadius, [event.nativeEvent.locationX, event.nativeEvent.locationY]))
    }

    pointInCircle = (centerOfCircle, radius, point) => {
        return (Math.pow(centerOfCircle[0] - point[0], 2) + Math.pow(centerOfCircle[1] - point[1], 2) <= Math.pow(radius,2))
    }

    log = (event) => {
        console.log("in log: ", event)
        return false
    }

    participateInTouchEventsHandler = (event) => {
        console.log("in participateInTouchEventsHandler")
        const inCircle1 = this.pointInCircle(this.state.polygonPoints[0], this.state.polygonCornerRadius, [event.nativeEvent.locationX, event.nativeEvent.locationY])
        const inCircle2 = this.pointInCircle(this.state.polygonPoints[1], this.state.polygonCornerRadius, [event.nativeEvent.locationX, event.nativeEvent.locationY])
        const inCircle3 = this.pointInCircle(this.state.polygonPoints[2], this.state.polygonCornerRadius, [event.nativeEvent.locationX, event.nativeEvent.locationY])
        const inCircle4 = this.pointInCircle(this.state.polygonPoints[3], this.state.polygonCornerRadius, [event.nativeEvent.locationX, event.nativeEvent.locationY])

        return (inCircle1 || inCircle2 || inCircle3 || inCircle4)
    }

    participationGrantedHandler = (event) => {
        console.log("in participationGrantedHandler")

        const inCircle1 = this.pointInCircle(this.state.polygonPoints[0], this.state.polygonCornerRadius, [event.nativeEvent.locationX, event.nativeEvent.locationY])
        const inCircle2 = this.pointInCircle(this.state.polygonPoints[1], this.state.polygonCornerRadius, [event.nativeEvent.locationX, event.nativeEvent.locationY])
        const inCircle3 = this.pointInCircle(this.state.polygonPoints[2], this.state.polygonCornerRadius, [event.nativeEvent.locationX, event.nativeEvent.locationY])
        const inCircle4 = this.pointInCircle(this.state.polygonPoints[3], this.state.polygonCornerRadius, [event.nativeEvent.locationX, event.nativeEvent.locationY])

        let selectedCorner = -1
        if(inCircle1) {
            selectedCorner = 0
        }else if(inCircle2) {
            selectedCorner = 1
        }else if(inCircle3) {
            selectedCorner = 2
        }else if(inCircle4) {
            selectedCorner = 3
        }
        this.setState((prevState)=> {
            return {
                ...prevState,
                pressedCorner: selectedCorner
            }
        })
    }

    moveHandler = (event) => {
        console.log("in moveHandler")

        const cornerPos = [event.nativeEvent.locationX, event.nativeEvent.locationY]
        
        this.setState((prevState) => {
            let newPolygonPoints = prevState.polygonPoints
            newPolygonPoints[prevState.pressedCorner] = cornerPos
            return {
                ...prevState,
                pressedCorner: -1,
                polygonPoints: newPolygonPoints
            }
        })
    }

    touchUpHandler = (event) => {
        console.log("in touchUpHandler")

        const cornerPos = [event.nativeEvent.locationX, event.nativeEvent.locationY]
        
        this.setState((prevState) => {
            let newPolygonPoints = prevState.polygonPoints
            newPolygonPoints[prevState.pressedCorner] = cornerPos
            return {
                ...prevState,
                pressedCorner: -1,
                polygonPoints: newPolygonPoints
            }
        })
    }



    render () {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                        <ImageBackground source={this.props.place.image} style={styles.placeImage}>
                            <DraggableCorner 
                                cx={this.state.polygonPoints[0][0]} 
                                cy={this.state.polygonPoints[0][1]}
                            />
                            <DraggableCorner 
                                cx={this.state.polygonPoints[1][0]} 
                                cy={this.state.polygonPoints[1][1]}
                            />
                            <DraggableCorner 
                                cx={this.state.polygonPoints[2][0]} 
                                cy={this.state.polygonPoints[2][1]}
                            />
                            <DraggableCorner 
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
                    
                    <Text style={styles.itemText}>{this.props.place.name}</Text> 
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.placeDeleteHandler}>
                        <Icon size={30} name="ios-trash" color="red"/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    placeImage: {
        width: "100%",
        height: 200
    },
    itemText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 28
    },
    container: {
        paddingTop: 50,
        margin:26
    },
    contentContainer: {
        flexDirection: "column",
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        width: "50%"
    }
});

const mapPropsToDispatch = (dispatch) => {
    return {
        onDeletePlace: (placeKey) => dispatch(deletePlace(placeKey))
    };
}

export default connect(null, mapPropsToDispatch)(PlaceDetail);