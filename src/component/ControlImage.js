import React, { PureComponent } from "react";
import { StyleSheet, Text, Image } from "react-native";
import FastImage from "react-native-fast-image";

export default class ControlImage extends PureComponent {
  render() {
    return <FastImage {...this.props} />;
  }
}
const localStyles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black"
  }
});
