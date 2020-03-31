import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
  FlatList,
  AsyncStorage
} from 'react-native';
import {CustomHeader} from '../index';
import {RVText} from '../core/index';
import { NavigationEvents } from "react-navigation";


export class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    this.props.navigation.addListener("focus",async () => {
      const name = await AsyncStorage.getItem("name") || "";
      this.setState({ name: name });
      alert(this.state.name);
    })
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        {/* <NavigationEvents onWillFocus={this.onWillFocus} /> */}
        <CustomHeader title="Giỏ hàng" isHome={true} navigation={this.props.navigation} />
        
      </SafeAreaView>
    );
  }
}
