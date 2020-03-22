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
import {CustomHeader} from '../index';

export class NotificationsScreen extends Component {
  render() {
   return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader
        title="Notification"
        isHome={false}
        navigation={this.props.navigation}
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Notification!</Text>
      </View>
    </SafeAreaView>
  );
  }
}
