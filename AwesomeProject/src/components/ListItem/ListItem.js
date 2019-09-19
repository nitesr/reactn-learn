import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';

const listItem = (props) => (
    <TouchableOpacity onPress={() => props.itemSelectHandler(props.record.key)}>
        <View style={styles.listItem}>
            <Image resizeMode="cover" source={props.record.image} style={styles.placeImage}/>
            <Text style={styles.itemText}>{props.record.name}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        marginBottom: 10,
        backgroundColor: "#eee",
        flexDirection: "row",
        alignItems: "center"
    },
    itemText: {
        padding: 10
    },
    placeImage: {
        width: 50,
        height: 50,
        margin : 10
    }
});

export default listItem;