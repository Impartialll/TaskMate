import React from "react";
import { StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Divider, Text } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import AboutHeader from "./Components/AboutHeader";
import TaskStatistics from "./Components/Chart";

export default function About() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <AboutHeader navigation={navigation} />
      <Divider width={1} />
      <TaskStatistics />
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
