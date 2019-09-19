import React, {Component} from 'react';
import { Navigation } from 'react-native-navigation';

import { Provider } from 'react-redux';

import { LOGIN_SCREEN, PLACES_SCREEN, SHARE_PLACE_SCREEN, SIDE_DRAWER_SCREEN, PLACE_DETAIL_SCREEN } from './src/screens/screenNames'

import LoginScreen from './src/screens/Login/Login';
import AllPlacesScreen from './src/screens/AllPlaces/AllPlaces';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import SideDrawerScreen from './src/screens/SideDrawer/SideDrawer';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';

import configureStore from './src/store/configureStore';

const store = configureStore();

Navigation.registerComponent(
    LOGIN_SCREEN, 
    () => LoginScreen,
    store,
    Provider
);

Navigation.registerComponent(
    PLACES_SCREEN, 
    () => AllPlacesScreen,
    store,
    Provider
);


Navigation.registerComponent(
    SHARE_PLACE_SCREEN, 
    () => SharePlaceScreen,
    store,
    Provider
);

Navigation.registerComponent(
    SIDE_DRAWER_SCREEN, 
    () => SideDrawerScreen
);

Navigation.registerComponent(
    PLACE_DETAIL_SCREEN, 
    () => PlaceDetailScreen,
    store,
    Provider
);

Navigation.startSingleScreenApp({
    screen: {
        screen:  LOGIN_SCREEN,
        title: 'Login'   
    }
});

