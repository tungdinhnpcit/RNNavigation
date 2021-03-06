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
import AppStyle from "../../style";
import { TouchableOpacity } from "react-native-gesture-handler";
import Strings from "../../common/Strings";
import { getApi } from "../../apis/Apis";

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

    const Config_object = {
      apiUrl: "http://192.168.1.227:8090/api/Home/",
      urlImage: "http://192.168.1.227:8090",
    };
    this.setState({ url: Config_object.apiUrl });
    await AsyncStorage.setItem('apiUrl', JSON.stringify(Config_object));
    const account = await AsyncStorage.getItem("account");
    this.getToken();

    if (account) {
      this.props.navigation.navigate("HomeApp");
    }
  }

  async getToken() {
    try {
      getApi(`${this.state.url}GetToken`).then((response) => {
        AsyncStorage.setItem('token', JSON.stringify(response.data));
      }).catch(function (error) {
        console.log("!!!!!!!!!!!!!LoginScreen GET TOKEN ERROR!!!!!!!!!!!\n")
        console.log(error);
      });

      // axios({
      //   method: 'GET',
      //   url: `${this.state.url}GetToken`
      // }).then((response) => {
      //   AsyncStorage.setItem('token', JSON.stringify(response.data));

      // }).catch(function (error) {
      //   console.log("!!!!!!!!!!!!!LoginScreen GET TOKEN ERROR!!!!!!!!!!!\n")
      //   console.log(error);
      // });
    } catch (error) {
      console.log("!!!!!!!!!!!!!GET TOKEN ERROR!!!!!!!!!!!\n")
      console.log(error);
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
    } catch (error) { }
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
                  placeholder={Strings.Login.USER_NAME}
                  placeholderColor="#c4c3cb"
                  style={AppStyle.loginFormTextInput}
                />
                <TextInput
                  placeholder={Strings.Login.PASSWORD}
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
