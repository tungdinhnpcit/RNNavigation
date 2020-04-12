import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { CustomHeader } from "../../CustomHeader";

export class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passWord: "",
      email: "",
      sdt: "",
      url: "http://192.168.1.227:8090/api/Home/",
    };
  }

  onRegister = () => {
    try {
      var formData = new FormData();
      formData.append("USERNAME", this.state.userName);
      formData.append("PASSWORD", this.state.passWord);
      formData.append("EMAIL", this.state.email);
      formData.append("PHONE_NUMBER", this.state.sdt);
      let data = {
        USERNAME: this.state.userName,
        PASSWORD: this.state.passWord,
        EMAIL: this.state.email,
        PHONE_NUMBER: this.state.sdt,
      };
      console.log("data", data);
      console.log("url", `${this.state.url}userInsert`);
      fetch(`${this.state.url}userInsert`, {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("response object:", responseJson);
          if (responseJson.Success) {
            this.props.navigation.navigate("HomeApp");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) { }
  };

  onReset = () => { };

  insertUser = (userName) => {
    this.setState({ userName: userName });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader
          title="Register"
          isHome={false}
          navigation={this.props.navigation}
        />
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 5,
          }}
        >
          <KeyboardAvoidingView
            style={AppStyle.containerView}
            behavior="padding"
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={AppStyle.regFormView}>
                <View style={AppStyle.registerRow}>
                  <Text style={{ width: "30%", fontSize: 10 }}>Username:</Text>
                  <TextInput
                    placeholder="Username"
                    placeholderColor="#c4c3cb"
                    style={AppStyle.regFormTextInput}
                    onChangeText={(userName) =>
                      this.setState({ userName: userName })
                    }
                  />
                </View>
                <View style={AppStyle.registerRow}>
                  <Text style={{ width: "30%", fontSize: 10 }}>Password:</Text>
                  <TextInput
                    style={AppStyle.regFormTextInput}
                    placeholder="Password"
                    placeholderColor="#c4c3cb"
                    secureTextEntry={true}
                    onChangeText={(passWord) =>
                      this.setState({ passWord: passWord })
                    }
                  />
                </View>
                <View style={AppStyle.registerRow}>
                  <TouchableOpacity
                    style={AppStyle.regButton}
                    onPress={() => this.onRegister()}
                  >
                    <Text style={AppStyle.regText}>Register</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={AppStyle.regButton}
                    onPress={() => this.onReset()}
                  >
                    <Text style={AppStyle.regText}>Reset</Text>
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
