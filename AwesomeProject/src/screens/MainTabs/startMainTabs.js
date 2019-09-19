import React from 'react';
import { Navigation } from 'react-native-navigation';

import Icon from 'react-native-vector-icons/Ionicons'

import {PLACES_SCREEN, SHARE_PLACE_SCREEN, SIDE_DRAWER_SCREEN} from '../screenNames'

const startTabs = () => {
    Promise.all([
        Icon.getImageSource("ios-list", 30),
        Icon.getImageSource("ios-share-alt", 30),
        Icon.getImageSource("ios-menu", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: PLACES_SCREEN,
                    label: "Places",
                    title: "Places",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: SHARE_PLACE_SCREEN,
                    label: "Share Place",
                    title: "Share Place",
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                }
            ],
            drawer: {
                left: {
                    screen: SIDE_DRAWER_SCREEN
                }
            }
        });
    });

    
}

export default startTabs;