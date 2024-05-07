import { Text, View, StyleSheet, ScrollView } from "react-native";
import React from "react";

export default function HeaderComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Header</Text>
      <Text style={styles.textStyle}>Header</Text>
      <Text style={styles.textStyle}>Header</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textStyle: {
    marginHorizontal: 10,
  },
});
