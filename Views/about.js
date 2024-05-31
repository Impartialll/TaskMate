import React from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";

export default function About() {
  return (
    <SafeAreaView>

  <Text style={styles.textStyle}>About</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "black",
  },
  textStyle: {
    width: "100%",
    fontSize: 50,
  },
});
