import React, { Component } from 'react';
import {View, Text} from 'react-native';
import { connect } from 'react-redux';

import InputForm from '../../components/InputForm/InputForm'
import { addPlace } from '../../store/actions/index'

class SharePlace extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }

    onNavigatorEvent = (event) => {
        if(event.type == "NavBarButtonPress") {
            if(event.id == "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                  });
            }
        }
    }

    onSharePlaceHandler = (placeName) => {
        this.props.onAddPlace(placeName);
    }

    render() {
        return (
            <View>
                <InputForm addActionHandler={this.onSharePlaceHandler}/>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {onAddPlace: (placeName) => dispatch(addPlace(placeName))}
}

export default connect(null, mapDispatchToProps)(SharePlace);
