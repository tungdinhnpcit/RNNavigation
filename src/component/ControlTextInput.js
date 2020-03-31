import React, { PureComponent } from "react";
import {
     StyleSheet,
     Text,
 } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default class ControlTextInput extends PureComponent{
     render() {
     return (
          <TextInput {...this.props}
          secureTextEntry={this.props.secure}
          />
     )
     }
 }
const localStyles = StyleSheet.create({
     text: {
          fontSize: 14,
          fontWeight: "bold",
          color: "black"
     }
});
