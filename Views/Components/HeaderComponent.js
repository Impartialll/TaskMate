import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-elements";

export default function HeaderComponent({ categories, setCat }) {
  return (
    <View style={styles.container}>
      {categories.slice(0, 3).map((item) => (
        <Button
          key={item.id}
          title={item.name}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.titleStyle}
          onPress={() => setCat(item.name)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

    backgroundColor: "transparent",
  },
  buttonContainer: {
    marginHorizontal: 8,
    borderRadius: 17,
    // height: 32,
  },
  buttonStyle: {
    backgroundColor: "#ffb3b3",
    // borderWidth: 1.5,
    // borderColor: "white",
    // borderRadius: 0,
  },
  titleStyle: {
    // paddingBottom: 5,
    color: "black",
    fontWeight: "800",
    fontSize: 13,
  },
});
