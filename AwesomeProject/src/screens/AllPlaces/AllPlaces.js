import React, { Component } from 'react';
import {View, Text} from 'react-native';

import {connect} from 'react-redux';

import List from '../../components/List/List'
import { PLACE_DETAIL_SCREEN } from '../screenNames'

class AllPlaces extends Component {
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

    selectPlaceHandler = (placeKey) => {
        const selectedPlace = this.props.places.find( (place) => place.key === placeKey )
        this.props.navigator.push({
            screen: PLACE_DETAIL_SCREEN,
            title: selectedPlace.name,
            label: selectedPlace.name,
            passProps: {
                place: selectedPlace
            }
        })

    }

    render() {
        return (
            <View>
                <List itemSelectHandler={this.selectPlaceHandler} items={this.props.places}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        places: state.places.places
    }
}

export default connect(mapStateToProps, null)(AllPlaces);