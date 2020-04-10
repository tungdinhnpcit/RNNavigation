import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Alert
} from "react-native";
import { CustomHeader } from "../index";
import ControlText from "../component/ControlText";
import { SliderBox } from "react-native-image-slider-box";
const { width } = Dimensions.get("window");
import * as Progress from "react-native-progress";
import Geolocation from "@react-native-community/geolocation";
import MapView, { Marker,PROVIDER_GOOGLE } from "react-native-maps";
import OneSignal from "react-native-onesignal";
import AppStyle from "../style";

export class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      city: "",
      isShowLoading: false,
      selectedIndex: 0,
      tabIndex: 0,
      latitude: undefined,
      longitude: undefined,
      renderKey: Date.now()
    };
    OneSignal.init("4cf4ecb2-f26f-4e80-b4f4-49c48d27e04d");
  }
  async componentDidMount() {
    try {
      console.log("address", 9999);
    
      // Geolocation.requestAuthorization();
      Geolocation.getCurrentPosition(
        async position => {
          console.log(position.coords);
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            renderKey: Date.now()
          });
          console.log("address", this.state.latitude);
          const address = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyDTY8kR_buT28WOpOKtJCbqa8uX5T1ue3s`
          );
          let json = await address.json();
          console.log("address", json);
        },
        error => Alert.alert("Error", JSON.stringify(error)),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
      );
      // this.watchID = Geolocation.watchPosition(position => {
      //   const lastPosition = JSON.stringify(position);
      //   this.setState({lastPosition});
      // });

      const response = await fetch(
        "http://5e7f5f477a92ed001656051f.mockapi.io/Category"
      );
      let json = await response.json();
      this.setState({ data: json });
    } catch (error) {
      // Alert.alert("Error", error);
    }
  }

  componentWillMount() {}

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ff01" }}>
        {this.state.isShowLoading ? (
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : null}
        {/* {this.state.latitude && this.state.longitude ? ( */}
          <View style={AppStyle.mapContainer} key={this.state.renderKey}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={AppStyle.map}
              initialRegion={{
                latitude: this.state.latitude || 0,
                longitude:  this.state.longitude || 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            >
              <Marker
                coordinate={{
                  latitude: this.state.latitude || 0,
                  longitude:  this.state.longitude || 0,
                }}
                title={"It's me"}
                description={"I am working at home"}
              />
            </MapView>
          </View>
        {/* //  ) : null} */}
        <CustomHeader
          title="Trang chủ"
          isHome={true}
          navigation={this.props.navigation}
        />
      </SafeAreaView>
    );
  }
}
