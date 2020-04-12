import React, { Component } from "react";
import { View, TouchableOpacity, FlatList, SafeAreaView, DeviceEventEmitter } from "react-native";
import { CustomHeader } from '../../index';
import ControlText from "../../component/ControlText";

export default class Search extends Component {
  _onPress = (item) => {
    console.log("callback val", "123");
    const callback = this.props.route.params.onCitySelected;
    if (typeof callback === "function") {
      callback(item);
      this.props.navigation.goBack();
      //           //clear stack
      // this.props.navigation.reset({routes: [{ name: 'HomeApp' }]});
    }
    //      DeviceEventEmitter.emit("city", item);
  };

  renderItem = (item, index) => {
    return (
      <TouchableOpacity style={{ width: 100, alignItems: "center" }} onPress={() => this._onPress(item)}>
        <ControlText style={{ textAlign: "center" }}>{item}</ControlText>
      </TouchableOpacity>
    );
  };

  render() {
    const cities = ["HCM", "HN", "CT"];
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ff01" }}>
        <CustomHeader
          title="Tim kiem"
          isHome={true}
          navigation={this.props.navigation}
        />
        <View style={{ height: "20%", width: "100%" }}>
          <FlatList
            data={cities}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            keyExtractor={(item, index) => "key" + index}
          />
        </View>
      </SafeAreaView>
    );
  }
}
