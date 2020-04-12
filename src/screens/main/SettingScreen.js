import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import { CustomHeader } from '../../index';

export class SettingScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader title="Settings" isHome={true} navigation={this.props.navigation} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Setting!</Text>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => {
              this.props.navigation.navigate('SettingDetail');
            }}>
            <Text>Setting Detail</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
