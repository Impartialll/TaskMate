import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { FAB, Overlay } from "react-native-elements";

import { AntDesign } from "@expo/vector-icons";

import Home from "../Views/home";
import tasks from "../services/tasks";

import MyModal from "./MyModal";

export default function MyFAB() {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    console.log(true);
    setVisible(!visible);
  };

  return (
    <View>
      {/* <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      </Overlay> */}
      <MyModal isVisible={visible} toggleOverlay={toggleOverlay} />
      <FAB
        placement="right"
        style={styles.fabStyle}
        onPress={toggleOverlay}
        icon={() => {
          return <AntDesign name="plus" size={24} color="black" />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fabStyle: {
    bottom: 60,
  },
});
