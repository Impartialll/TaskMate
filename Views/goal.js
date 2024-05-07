import React from "react";
import { Tab, Text, TabView } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

export default function Goal() {
  return <Text style={styles.textStyle}>Goal</Text>;
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
