import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, Button, Modal, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'


export default class ItemDetail extends Component {
    render = () => {
        let modalContent = null
        if(this.props.record != null) {
            modalContent = (
                <View style={styles.modalContentContainer}>
                    <Image source={this.props.record.image} style={styles.placeImage}/>
                    <Text style={styles.itemText}>{this.props.record.name}</Text> 
                </View>
            )  
        }
    
        return <Modal animationType="slide" 
            visible={this.props.record != null}
            onRequestClose={() => {this.props.onModalClosed()}}>
            <View style={styles.modalContainer}>
                {modalContent}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => this.props.itemDeleteHandler()}>
                        <Icon size={30} name="ios-trash" color="red"/>
                    </TouchableOpacity>
                    <Button title="Close"  style={styles.button} onPress={this.props.onModalClosed}/>
                </View>
            </View>
        </Modal>
    }
};

const styles = StyleSheet.create({
    placeImage: {
        width: "100%",
        height: 200
    },
    itemText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 28
    },
    modalContainer: {
        paddingTop: 50,
        margin:26
    },
    modalContentContainer: {
        flexDirection: "column",
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        width: "50%"
    }
});
