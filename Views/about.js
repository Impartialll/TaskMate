import React from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";

export default function About() {
  return (
    <SafeAreaView style={styles.container}>

  <Text style={styles.textStyle}>About</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    width: "100%",
    fontSize: 50,
  },
});
