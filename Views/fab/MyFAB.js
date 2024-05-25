import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { FAB, Overlay } from "react-native-elements";

import { AntDesign } from "@expo/vector-icons";

import MyModal from "./MyModal";

export default function MyFAB({ fetchData }) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      {/* <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      </Overlay> */}
      <MyModal
        isVisible={visible}
        toggleOverlay={toggleOverlay}
        updateTasks={fetchData}
      />
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
  container: {
    // position: "absolute",
    bottom: 55,
  },
  // fabStyle: {
  //   bottom: 60,
  // },
});
