import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';


export default class InputForm extends Component {
    state = {
        placeName: ""
    };

    placeNameChangeHandler = (value) => {
        this.setState({placeName: value})
    };

    render = (props) => {
        return <View style={styles.formView}>
                <TextInput style={styles.formInput}
                    placeholder = "Enter Place"
                    value={this.state.placeName}
                    onChangeText={this.placeNameChangeHandler}/>
            
                <Button style={styles.formButton}
                    title="Add" 
                    onPress={() => this.props.addActionHandler(this.state.placeName)}/>
            </View>
        
    }


}

const styles = StyleSheet.create({
    formView: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        //alignItems: "center"
    },
    formInput: {
        width: "80%",
        borderWidth: 0
    },
    formButton: {
        width: "20%"
    }
});
