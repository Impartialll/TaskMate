import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Overlay } from "react-native-elements";

import Navigation from "./Views/Navigation";
import MyFAB from "./components/MyFAB";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
      <MyFAB />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
