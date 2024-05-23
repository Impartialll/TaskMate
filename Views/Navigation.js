import React from "react";
import { View } from "react-native";

import {
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome6,
} from "@expo/vector-icons";

import Home from "./home";
import Goal from "./goal";
import About from "./about";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    botoom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff",
  },
};

export default function Navigation({ tasks, cats, setCat }) {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          children={() => <Home tasks={tasks} cats={cats} setCat={setCat} />}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <FontAwesome
                    name="list-alt"
                    size={24}
                    color={focused ? "#16247d" : "#111"}
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Goal"
          component={Goal}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <MaterialCommunityIcons
                    name="star-shooting"
                    size={24}
                    color={focused ? "#16247d" : "#111"}
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="About"
          component={About}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <FontAwesome6
                    name="smile-wink"
                    size={24}
                    color={focused ? "#16247d" : "#111"}
                  />
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
