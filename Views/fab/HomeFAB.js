import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { FAB } from "@rneui/base";

import { AntDesign } from "@expo/vector-icons";

import HomeModal from "./HomeModal";

export default function MyFAB({ onClose, updateTasks, date, setDate }) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
    onClose();
  };

  return (
    <View style={styles.container}>
      <HomeModal
        isVisible={visible}
        toggleOverlay={toggleOverlay}
        updateTasks={updateTasks}
        date={date}
        setDate={setDate}
      />
      <FAB
        placement="right"
        style={styles.fabStyle}
        onPress={toggleOverlay}
        icon={() => {
          return <AntDesign name="plus" size={24} color="#fff" />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    bottom: 55,
  },
});
