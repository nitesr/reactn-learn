/**
 * @format
 */
import { AppRegistry } from "react-native";
//import App from './SingleScreenApp';
import App from "./HelloWorldApp";
import {name as appName} from './app.json';

console.log("index.ios.js")
let appKey = AppRegistry.registerComponent(appName, () => {
    console.log("registering the App")
    return App
});
console.log("appKey", appKey);


//import React from 'react';
//import {Provider} from 'react-redux';
//import App from './App';
//import App from './SimpleApp';
//import App from './NavigationApp';

/*
import configureStore from './src/store/configureStore';

const store = configureStore();


const RNRedux = () => (
    <Provider store={store}>
        <App/>
    </Provider>
)
AppRegistry.registerComponent(appName, () => RNRedux);
*/


