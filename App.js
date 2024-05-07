import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import NavigationTabs from "./Views/NavigationTabs";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationTabs />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
