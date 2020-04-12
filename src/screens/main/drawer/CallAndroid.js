import React, { Component } from "react";
import {
    View,
    Dimensions,
} from "react-native";
const { width } = Dimensions.get("window");
import CustomView from "../CustomView"
import { ToastExample } from "../../../modules/ToastModule";

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
