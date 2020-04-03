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
import { IMAGE} from './constant/Image'

export class CustomDrawerContent extends Component {
  constructor(props) {
        super(props);
    }
    
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{height: 100, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={IMAGE.ICON_PROFILE}
            style={{
              width: 80,
              height: 80,
              alignItems: 'center',
              borderRadius: 50,
              resizeMode: 'contain',
            }}></Image>
        </View>
        <ScrollView style={{marginLeft: 5}}>
          <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => {
              this.props.navigation.navigate('MenuTab');
            }}>
            <Text>Menu Tab</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => {
              this.props.navigation.navigate('Notifications');
            }}>
            <Text>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => {
              this.props.navigation.navigate('Map');
            }}>
            <Text>Map</Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity
            style={{marginTop: 20, marginLeft:10}}
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}>
            <Text>Logout</Text>
          </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
