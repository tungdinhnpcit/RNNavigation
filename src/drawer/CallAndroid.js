import React, { Component } from "react";
import {
    View,
    Dimensions,
    NativeModules,
} from "react-native";
const { width } = Dimensions.get("window");
const ToastExample = NativeModules.ToastExample;
export { ToastExample };
import CustomView from "../tab/CustomView"

export default class CallAndroid extends Component {
    constructor(props) {
        super(props);
        ToastExample.callback((message) => alert(message))
    }

    render() {
        return (
            <View>
                <CustomView message={"Say Hello"} style={{ width: 200, height: 200 }} />
            </View>
        );
    }
}
