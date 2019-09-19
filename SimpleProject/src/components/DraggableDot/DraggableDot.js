import React, {Component} from 'react'
import {StyleSheet, View, Animated, PanResponder } from 'react-native'
import {Circle} from 'react-native-svg'


class DraggableDot extends Component {
    _val = {x: 0, y: 0}

    constructor(props) {
        super(props);
        this._val = { x: (props.cx), y: (props.cy) }
        this.state = {
            pan: {x: this._val.x, y: this._val.y}
        }
        console.log("_val.x=", this._val.x, ",_val.y=", this._val.y)
    }

    panResponderMoveHandler = (e, gesture) => {
        this.setState({pan: { x: this._val.x+gesture.dx, y:this._val.y+gesture.dy}})
    }

    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (event, gesture) => true,
        onPanResponderMove: this.panResponderMoveHandler,
        onPanResponderEnd: (event, gesture) => {
            console.log("_val.x=", this._val.x, ",_val.y=", this._val.y)
            console.log("x=", this.state.pan.x, ",y=", this.state.pan.y)
        }
    })

    render() {
        return (
            <Circle 
            {...this.panResponder.panHandlers}
            cx={this.state.pan.x} cy={this.state.pan.y} r={this.props.r} fill="pink" />
        );
    }
}

export default DraggableDot;