import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  AsyncStorage,
} from 'react-native';
import { CustomHeader } from '../index';
import { RVText } from '../core/index';
import { NavigationEvents } from "react-navigation";
import { IMAGE } from "../constant/Image";

export class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    this.props.navigation.addListener("focus", async () => {
      const name = await AsyncStorage.getItem("name") || "";
      this.setState({ name: name });

    })
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* <NavigationEvents onWillFocus={this.onWillFocus} /> */}
        <CustomHeader title="Giỏ hàng" isHome={true} navigation={this.props.navigation} />
        <View style={{ width: 100, height: 100 }}>
          <Image
            source={IMAGE.ICON_ADDCART}
            style={{ width: 100, height: 100 }}
          />
          <View style={{ position: "absolute", right: 0, top: 10, backgroundColor: "red", width: 30, height: 30, borderRadius: 15, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 15 }}>{1}</Text>
          </View>
        </View>

      </SafeAreaView>
    );
  }
}
