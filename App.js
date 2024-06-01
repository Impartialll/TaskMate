import "react-native-gesture-handler";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";

import { StatusBar } from "expo-status-bar";

import Navigation from "./Views/navigation/Navigation";

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <Navigation/>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
