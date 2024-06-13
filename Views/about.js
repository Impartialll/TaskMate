import React from "react";
import { StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Text } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import AboutHeader from "./Components/AboutHeader";

export default function About() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <AboutHeader navigation={navigation} />
      <Text h3 style={styles.textStyle}>About</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    width: "100%",
    // fontSize: 50,
  },
});
