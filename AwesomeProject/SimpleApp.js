/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput} from 'react-native';
import {connect} from 'react-redux';

import InputForm from './src/components/InputForm/InputForm';
import List from './src/components/List/List';
import ItemDetail from './src/components/ItemDetail/ItemDetail';
//import placeImage from './src/assets/beautiful-place.jpg';

import {addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions/index'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class SimpleApp extends Component {
  addActionHandler = (placeName) => {
    if(placeName.trim() != "") {
      this.props.onAddPlace(placeName);
    }
  };

  itemSelectHandler = (key) => {
    this.props.onSelectPlace(key);
  }

  itemDeleteHandler = (selectedPlace) => {
    this.props.onDeletePlace();
  }

  deselectItemHandler = () => {
    this.props.onDeselectPlace();
  }

  render() {
    return (
      <View style={styles.container}>
          <ItemDetail record={this.props.selectedPlace} 
              itemDeleteHandler={this.itemDeleteHandler}
              onModalClosed={this.deselectItemHandler}/>
          <InputForm 
            addActionHandler={this.addActionHandler}
          />
        <List items={this.props.places} itemSelectHandler={this.itemSelectHandler}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: "100%",
    backgroundColor: '#FFF',
    paddingTop: 60,
    padding: 30
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPlace:  (place) => (dispatch(addPlace(place))),
    onSelectPlace: (key) => (dispatch(selectPlace(key))),
    onDeletePlace: () => dispatch(deletePlace()),
    onDeselectPlace: () => dispatch(deselectPlace())
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(SimpleApp);
