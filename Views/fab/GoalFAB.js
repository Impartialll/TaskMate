import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { FAB, Overlay } from "@rneui/base";

import { AntDesign } from "@expo/vector-icons";

import GoalModal from "./GoalModal";
import MyModal from "./HomeModal";

export default function GoalFAB( {onClose} ) {
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
        onClose()
    };
  return (
    <View style={styles.container}>
        <GoalModal
        isVisible={visible}
        toggleOverlay={toggleOverlay}
      />
      {/* <MyModal
        isVisible={visible}
        toggleOverlay={toggleOverlay}
      /> */}
      <FAB
        placement="right"
        style={styles.fabStyle}
        onPress={toggleOverlay}
        icon={() => {
          return <AntDesign name="plus" size={24} color="#fff" />;
        }}
      />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      bottom: 55,
    }
  });
  