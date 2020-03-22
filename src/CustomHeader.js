import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import {IMAGE} from './constant/Image';

export class CustomHeader extends Component {
  constructor(props) {
        super(props);
    }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
        }}>
        {
        this.props.isHome ? (
          <TouchableOpacity
            style={{flex: 1, paddingLeft: 5}}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}>
            <Image
              style={{width: 30, height: 30}}
              source={IMAGE.ICON_MENU}
              resizeMode="contain"></Image>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{flexDirection: 'row', flex: 1, paddingLeft: 5}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              style={{width: 30, height: 30}}
              source={IMAGE.ICON_BACK}
              resizeMode="contain"></Image>
          </TouchableOpacity>
        )}
        <View
          style={{
            flex: 1.5,
            justifyContent: 'center',
          }}>
          <Text style={{textAlign: 'center'}}>{this.props.title}</Text>
        </View>
        <View style={{flex: 1}}></View>
      </View>
    );
  }
}
