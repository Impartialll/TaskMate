import React from "react";
import { View, Text } from "react-native";

export default function ListItem({ element }) {
  return (
    <View>
      <Text>{element.name}</Text>
    </View>
  );
}
