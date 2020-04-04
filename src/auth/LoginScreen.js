import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import AppStyle from "../style";
import { CustomHeader } from "../index";
import { TouchableOpacity } from "react-native-gesture-handler";

export class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      pass: "",
      url: ""
    };
  }

  async componentDidMount() {
    let UID_object = {
      name: 'http://192.168.1.227:8090/api/Home/',
    };
    await AsyncStorage.setItem("ApiUrl",JSON.stringify(UID_object));
    apiUrl = AsyncStorage.getItem("ApiUrl");

    const account = await AsyncStorage.getItem("account");
    if (account) {
      // this.props.navigation.navigate("HomeApp");
    }
  }

  onPress = async () => {
    const account = {
      username: this.state.username,
      pass: this.state.pass,
    };
    try {
      await AsyncStorage.setItem("account", JSON.stringify(account));
      this.props.navigation.navigate("HomeApp");
    } catch (error) {}
  };

  onRegister = () => {
    try {
      this.props.navigation.navigate("Register");
    } catch (error) {
      Alert.alert("Register error:", error);
    }
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 16,
          }}
        >
          <KeyboardAvoidingView
            style={AppStyle.containerView}
            behavior="padding"
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                  onChangeText={
                    (pass) => this.setState({ pass: pass })
                }
                />
                <TouchableOpacity
                  style={AppStyle.loginButton}
                  onPress={() => this.onPress()}
                >
                  <Text style={AppStyle.textLoginButton}>Login</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Text></Text>
                  </View>
                  <View style={{ flex: 1, paddingTop: 10, paddingRight: 15 }}>
                    <TouchableOpacity onPress={() => this.onRegister()}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#5097bf",
                          fontStyle: "italic",
                          textAlign: "right",
                        }}
                      >
                        Register
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    );
  }
}
