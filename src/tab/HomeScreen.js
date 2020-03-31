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
  TextInput,
  DeviceEventEmitter,
  AsyncStorage,
  ActivityIndicator,
  Alert
} from "react-native";
import { CustomHeader } from "../index";
import ControlText from "../component/ControlText";
import { SliderBox } from "react-native-image-slider-box";
import ControlImage from "../component/ControlImage";
const { height, width } = Dimensions.get("window");
import ControlTextInput from "../component/ControlTextInput";
import * as Progress from "react-native-progress";
// import Geolocation from 'react-native-geolocation-service';
import Geolocation from "@react-native-community/geolocation";
//Geolocation.setRNConfiguration(config);
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";
import OneSignal from "react-native-onesignal";

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      city: "",
      isShowLoading: false,
      selectedIndex: 0,
      tabIndex: 0,
      initialPosition: ""
    };
    OneSignal.init("4cf4ecb2-f26f-4e80-b4f4-49c48d27e04d");
  }

  async componentDidMount() {
    try {
      Geolocation.requestAuthorization();
      Geolocation.getCurrentPosition(
        position => {
          const initialPosition = JSON.stringify(position);
          this.setState({ initialPosition: initialPosition });
        },
        error => Alert.alert("Error", JSON.stringify(error)),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
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
      Alert.alert("Error", error);
    }
  }

  componentWillMount() {
    // DeviceEventEmitter.addListener("city", (item) => {
    //    this.setState({city: item})
    // })
    // this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  renderItem = (item, index) => {
    return (
      <View
        key={index}
        style={{ width: 100, alignItems: "center", paddingTop: 10 }}
      >
        <TouchableOpacity
          style={{ width: 100, alignItems: "center" }}
          onPress={() => {
            this.setState({ selectedIndex: index });
          }}
        >
          <Image
            source={{ uri: item.Image }}
            style={{ width: 40, height: 40 }}
            resizeMode={"stretch"}
          />
          <ControlText
            style={{
              textAlign: "center",
              color: this.state.selectedIndex === index ? "red" : "black"
            }}
          >
            {item.name}
          </ControlText>
        </TouchableOpacity>
      </View>
    );
  };

  onCitySelected = city => {
    this.setState({ city: city });
  };

  render() {
    const images = [
      "https://scx1.b-cdn.net/csz/news/800/2019/2-nature.jpg",
      "https://scx1.b-cdn.net/csz/news/800/2019/2-nature.jpg",
      "https://scx1.b-cdn.net/csz/news/800/2019/2-nature.jpg"
    ];
    const a = ["Gan toi", "Ban chay", "Danh gia"];
    //images.push()
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ff01" }}>
        <CustomHeader
          title="Trang chủ"
          isHome={true}
          navigation={this.props.navigation}
        />
        <View
          style={{
            width: "100%",
            height: "100%",
            paddingHorizontal: 16
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                marginBottom: 10,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "#f7fffd",
                width: "70%",
                backgroundColor: "white",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  color: "gray",
                  paddingLeft: 10,
                  fontSize: 10
                }}
              >
                Tìm kiếm
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Search", {
                  onCitySelected: this.onCitySelected
                });
              }}
              style={{
                marginBottom: 10,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "#f7fffd",
                width: "30%",
                backgroundColor: "white"
              }}
            >
              <Text
                style={{
                  color: "gray",
                  paddingLeft: 10,
                  fontSize: 10
                }}
              >
                {this.state.city}
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <SliderBox
              images={images}
              parentWidth={width - 16 - 16}
              sliderBoxHeight={158}
              // onCurrentImagePressed={index =>
              //   this.controller.onBannerItemPress(banners[index])
              // }
              dotColor="#D8A962"
              inactiveDotColor="#D8D8D8"
              autoplay
              circleLoop
              resizeMethod={"resize"}
              resizeMode={"stretch"}
              dotStyle={{
                width: 5,
                height: 5,
                borderRadius: 0
              }}
              ImageComponentStyle={{ borderRadius: 5 }}
              imageLoadingColor="#D8A962"
            />
            <View style={{ width: "100%" }}>
              <FlatList
                horizontal={true}
                data={this.state.data}
                renderItem={({ item, index }) => this.renderItem(item, index)}
                keyExtractor={(item, index) => "key" + item.id}
              />
              <View
                style={{ marginTop: 16, flexDirection: "row", width: "100%" }}
              >
                {a.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={{
                        width: `${100 / a.length}%`,
                        alignItems: "center"
                      }}
                      onPress={() => {
                        this.setState({ tabIndex: index });
                      }}
                      key={index}
                    >
                      <ControlText
                        style={{
                          color: this.state.tabIndex === index ? "red" : "black"
                        }}
                      >
                        {item}
                      </ControlText>
                      <View
                        style={{
                          width: "100%",
                          height: 1,
                          backgroundColor:
                            this.state.tabIndex === index
                              ? "red"
                              : "transparent"
                        }}
                      ></View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </View>

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
      </SafeAreaView>
    );
  }
}
