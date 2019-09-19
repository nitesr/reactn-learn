import React, {Component} from 'react'
import {StyleSheet, View, Animated, PanResponder } from 'react-native'

class DraggableCorner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY({x: props.cx, y:props.cy})
        }
        this._val = { x: props.cx, y: props.cy }
    }

    componentWillMount() {
        this.state.pan.addListener((value) => this._val = value)

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gesture) => true,
            onPanResponderGrant: (e, gesture) => {
                this.state.pan.setOffset({
                    x: this._val.x,
                    y: this._val.y
                })
            },
            onPanResponderMove: Animated.event([
                null,
                {dx: this.state.pan.x, dy: this.state.pan.y}
            ])
        })
    }

    render() {
        return (
            <View style={{ width: "20%", alignItems: "center" }}>
              {this.renderDraggable()}
            </View>
        );
    }

    renderDraggable() {
        const panStyle = {
            transform: this.state.pan.getTranslateTransform()
        }

        return (
            <View style={{ position: "absolute" }}>
              <Animated.View
                {...this.panResponder.panHandlers}
                style={[panStyle, styles.circle]}
              />
            </View>
        );

    }

}

const CIRCLE_RADIUS = 10;

const styles = StyleSheet.create({
    circle: {
        backgroundColor: "skyblue",
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS
      }
})

export default DraggableCorner;