import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { FAB } from "@rneui/base";

import { AntDesign } from "@expo/vector-icons";

import HomeModal from "./Modal";

export default function MyFAB({ onClose, updateData, date, setDate, title_state, placeholder_state, state, addSubtask }) {
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
        updateData={updateData}
        date={date}
        setDate={setDate}
        title_state={title_state}
        placeholder_state={placeholder_state}
        state={state}
        addSubtask={addSubtask}
      />
      <FAB
        placement="right"
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
