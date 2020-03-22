import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomHeader, CustomDrawerContent} from './src';
import {HomeScreen, HomeDetail, SettingScreen, SettingDetail} from './src/tab';
import {NotificationsScreen} from './src/drawer';
import {RegisterScreen, LoginScreen} from './src/auth';
import {IMAGE} from './src/constant/Image'

const StackHome = createStackNavigator();
const StackSetting = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const navOptionHandler = () => ({
  headerShown: false,
});

function HomeStack() {
  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen
        name="Home"
        component={HomeScreen}
        options={navOptionHandler}></StackHome.Screen>
      <StackHome.Screen
        name="HomeDetail"
        component={HomeDetail}
        options={navOptionHandler}></StackHome.Screen>
    </StackHome.Navigator>
  );
}

function SettingStack() {
  return (
    <StackSetting.Navigator initialRouteName="Setting">
      <StackSetting.Screen
        name="Setting"
        component={SettingScreen}
        options={navOptionHandler}></StackSetting.Screen>
      <StackSetting.Screen
        name="SettingDetail"
        component={SettingDetail}
        options={navOptionHandler}></StackSetting.Screen>
    </StackSetting.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? IMAGE.ICON_FOCUSED
              : IMAGE.ICON_HOME;
          } else if (route.name === 'Settings') {
            iconName = focused
              ? IMAGE.ICON_STF
              : IMAGE.ICON_SETTING;
          }
          // You can return any component that you like here!

          return (
            <Image
              source={iconName}
              style={{width: 20, height: 20}}
              resizeMode="contain"
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'black',
      }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Settings" component={SettingStack} />
    </Tab.Navigator>
  );
}

function DrawerNavigator({navigation}) {
  return (
    <Drawer.Navigator
      initialRouteName="MenuTab"
      drawerContent={() => <CustomDrawerContent navigation={navigation} />}>
      <Drawer.Screen name="MenuTab" component={TabNavigator} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}

const StackApp = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName="Login">
        <StackApp.Screen
          name="HomeApp"
          component={DrawerNavigator}
          options={navOptionHandler}></StackApp.Screen>
        <StackApp.Screen
          name="Login"
          component={LoginScreen}
          options={navOptionHandler}></StackApp.Screen>
        <StackApp.Screen
          name="Register"
          component={RegisterScreen}
          options={navOptionHandler}></StackApp.Screen>
      </StackApp.Navigator>
    </NavigationContainer>
  );
}
