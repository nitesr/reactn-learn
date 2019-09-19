import React, { Component } from "react";
import { View, Text } from "react-native";

export default class HelloWorldApp extends Component {
    render() {
      return (
        <View style={{ backgroundColor: "#fff", flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Hello, world!</Text>
        </View>
      );
    }
  }