import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import ListItem from '../ListItem/ListItem';

const list = (props) => {
    return (
        <FlatList style={styles.listContainer}
            data={props.items}
            renderItem={({item}) => {
                return <ListItem record={item} 
                    itemSelectHandler={props.itemSelectHandler}
                    />
            }}/>
    );
};


const styles = StyleSheet.create({
    listContainer: {
        //flexDirection: "column",
        width: "100%"
    }
});

export default list;