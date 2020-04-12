import * as React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
  ScrollView
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawerContent } from "./src";
import {
  HomeScreen,
  HomeDetail,
  Cart,
} from "./src/screens/main";
import CallAndroid from "./src/screens/main/drawer/CallAndroid";
import { NotificationsScreen, Map } from "./src/screens/main/drawer";
import { RegisterScreen, LoginScreen } from "./src/screens/auth";
import { IMAGE } from "./src/constant/Image";
import Search from './src/screens/main/Search'
import ProductDetail from './src/screens/main/ProductDetail'
import Strings from "./src/common/Strings";

//diable warning
//console.disableYellowBox=true;

const StackHome = createStackNavigator();
const StackSetting = createStackNavigator();
const StackCart = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const navOptionHandler = () => ({
  headerShown: false
});

function HomeStack() {
  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen
        name="Home"
        component={HomeScreen}
        options={navOptionHandler}
      ></StackHome.Screen>
      <StackHome.Screen
        name="HomeDetail"
        component={HomeDetail}
        options={navOptionHandler}
      ></StackHome.Screen>
    </StackHome.Navigator>
  );
}

function CartStack() {
  return (
    <StackCart.Navigator initialRouteName="Cart">
      <StackCart.Screen
        name="Cart"
        component={Cart}
        options={navOptionHandler}
      ></StackCart.Screen>
    </StackCart.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? IMAGE.ICON_FOCUSED : IMAGE.ICON_HOME;
          } else if (route.name === "Settings") {
            iconName = focused ? IMAGE.ICON_STF : IMAGE.ICON_SETTING;
          } else if (route.name === "Cart") {
            iconName = focused ? IMAGE.ICON_CARTSELECT : IMAGE.ICON_CART;
          }
          // You can return any component that you like here!

          return (
            <Image
              source={iconName}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          );
        }
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "black"
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Cart" component={CartStack} />
      {/* <Tab.Screen name="DaLuu" component={SettingStack} /> */}
    </Tab.Navigator>
  );
}

function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator
      initialRouteName="MenuTab"
      drawerContent={() => <CustomDrawerContent navigation={navigation} />}
    >
      <Drawer.Screen name="MenuTab" component={TabNavigator} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="Map" component={Map} />
      <Drawer.Screen name="ProductDetail" component={ProductDetail} />
      <Drawer.Screen name="CallAndroid" component={CallAndroid} />
    </Drawer.Navigator>
  );
}

const StackApp = createStackNavigator();

export default function App() {
  Strings.setLanguage("en")
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName="Login">
        <StackApp.Screen
          name="HomeApp"
          component={DrawerNavigator}
          options={navOptionHandler}
        ></StackApp.Screen>
        <StackApp.Screen
          name="Login"
          component={LoginScreen}
          options={navOptionHandler}
        ></StackApp.Screen>
        <StackApp.Screen
          name="Search"
          component={Search}
          options={navOptionHandler}
        ></StackApp.Screen>
        <StackApp.Screen
          name="Register"
          component={RegisterScreen}
          options={navOptionHandler}
        ></StackApp.Screen>
      </StackApp.Navigator>
    </NavigationContainer>
  );
}
