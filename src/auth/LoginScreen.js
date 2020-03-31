import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  AsyncStorage,
  TouchableWithoutFeedback,
  Button,
  Keyboard, KeyboardAvoidingView
} from "react-native";
import AppStyle from "../style";
import { CustomHeader } from "../index";
import { TouchableOpacity } from "react-native-gesture-handler";

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      pass: ""
    };
  }

  async componentDidMount() {
    const account = await AsyncStorage.getItem("account");
    if (account) {
      this.props.navigation.navigate("HomeApp");
    }
  }

  onPress = async () => {
    const account = {
      username: this.state.username,
      pass: this.state.pass
    };
    try {
      await AsyncStorage.setItem("account", JSON.stringify(account));
      this.props.navigation.navigate("HomeApp");
    } catch (error) {}
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'}}>
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 16
          }}
        >
          <KeyboardAvoidingView style={AppStyle.containerView} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={AppStyle.loginScreenContainer}>
                <View style={AppStyle.loginFormView}>
                  <Text style={AppStyle.logoText}>Online Shopping</Text>
                 
                  <TextInput
                    placeholder="Username"
                    placeholderColor="#c4c3cb"
                    style={AppStyle.loginFormTextInput}
                  />
                  <TextInput
                    placeholder="Password"
                    placeholderColor="#c4c3cb"
                    style={AppStyle.loginFormTextInput}
                    secureTextEntry={true}
                    onChangeText={pass => this.setState({ pass: pass })}
                  />
                  <TouchableOpacity
                    style={AppStyle.loginButton}
                    onPress={() => this.onPress()}
                  >
                    <Text style={AppStyle.textLoginButton}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    );
  }
}
