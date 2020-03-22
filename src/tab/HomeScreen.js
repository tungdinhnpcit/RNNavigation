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
import {RVText} from '../core/index';

export class HomeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader title="Home" isHome={true} navigation={this.props.navigation} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <RVText content='Home screen'/>
          <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => {
              this.props.navigation.navigate('HomeDetail');
            }}>
            <RVText style={{fontSize:20}} content='Go Home Detail'/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
