import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "../screens/Home";
import Setting from "../screens/Setting";
import PrivacyAndPolicy from "../screens/PrivacyAndPolicy";
import Player from "../screens/Player";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="MainScreen"
      >
        <Stack.Screen name="MainScreen" component={BottomNavigation} />
        <Stack.Screen
          name="PrivacyAndPolicyScreen"
          component={PrivacyAndPolicy}
        />
        <Stack.Screen name="PlayerScreen" component={Player} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BottomNavigation = () => (
  <Tab.Navigator
    initialRouteName="HomeScreen"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let routeName = route.name;

        if (routeName == "HomeScreen") {
          iconName = focused ? "home" : "home-outline";
        } else if (routeName == "SettingScreen") {
          iconName = focused ? "settings" : "settings-outline";
        }

        return <Ionicons name={iconName} size={25} color={color} />;
      },
      tabBarStyle: {
        backgroundColor: "black",
        padding: 10,
        height: 60,
        paddingBottom: 10,
      },
      tabBarLabelStyle: {
        display: "none",
      },
      tabBarActiveTintColor: "red",
      tabBarInactiveTintColor: "grey",
    })}
  >
    <Tab.Screen
      component={Home}
      name="HomeScreen"
      options={{ headerShown: false }}
    />
    <Tab.Screen
      component={Setting}
      name="SettingScreen"
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

export default MainNavigation;

const styles = StyleSheet.create({});
