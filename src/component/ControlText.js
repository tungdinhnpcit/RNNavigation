import React, { PureComponent } from "react";
import {
     StyleSheet,
     Text,
 } from "react-native";

export default class ControlText extends PureComponent{
     render() {
     return (
          <Text {...this.props} style={[localStyles.text, this.props.style]}>{this.props.children}</Text>
     )
     }
 }
const localStyles = StyleSheet.create({
     text: {
          fontSize: 12,
          color: "black"
     }
});
