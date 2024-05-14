import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";

import { Button } from "react-native-elements";

export default function MyModal({ isVisible, toggleOverlay }) {
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeaderText}>New task</Text>
          <TextInput style={styles.textInput} placeholder="Name your task" />
          <TextInput
            style={styles.textInput}
            placeholder="Description (Optional)"
          />
          <TextInput style={styles.textInput} placeholder="Category" />
          <View style={styles.buttonsContainer}>
            <Button
              title="Close"
              style={styles.button}
              onPress={toggleOverlay}
            />
            <Button
              title="Save"
              style={styles.button}
              onPress={toggleOverlay}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    marginTop: 5,
    marginHorizontal: "20%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    width: "100%",
  },
});
