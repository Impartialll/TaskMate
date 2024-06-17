import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import Navigation from "./Views/navigation/Navigation";

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { registerForPushNotificationsAsync } from "./Views/notifications/NotificationService";

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PaperProvider>
        <Navigation/>
        <StatusBar style="auto" />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}