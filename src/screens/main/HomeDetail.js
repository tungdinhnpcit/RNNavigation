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

export class HomeDetail extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader
          title="Home Detail"
          isHome={false}
          navigation={this.props.navigation}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home Detail!</Text>
        </View>
      </SafeAreaView>
    );
  }
}
