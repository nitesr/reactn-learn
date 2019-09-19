import React, { Component } from 'react';
import {View, Text, Button} from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';

class Login extends Component {
    loginHandler = () => {
        startMainTabs();
    }

    render() {
        return (
            <View>
                <Text>Please Login</Text>
                <Button title="Enter" onPress={this.loginHandler}/>
            </View>
        );
    }
}

export default Login;