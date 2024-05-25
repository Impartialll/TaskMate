import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";

import { Button, Input } from "react-native-elements";

import tasks from "../../services/tasks";

export default function MyModal({ isVisible, toggleOverlay, updateTasks }) {
  const [inputName, setName] = useState("");
  const [inputDescription, setDescriptoion] = useState("");
  const [inputCategory, setCategory] = useState("");

  const handleSave = () => {
    if (inputName != "") {
      addHandler(inputName, inputDescription, inputCategory);
    }
    toggleOverlay();
  };

  const addHandler = async (name, description, category) => {
    try {
      const trimmedName = name.trim();
      const trimmedDescription = description.trim();
      const trimmedCategory = category.trim();
      const newData = {
        name: trimmedName,
        description: trimmedDescription,
        category: trimmedCategory,
      };
      await tasks.create(newData);
      updateTasks();
    } catch (error) {
      console.error("Error adding the task:", error);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeaderText}>New task</Text>
          {/* <TextInput
            style={styles.textInput}
            placeholder="Name your task"
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Description (Optional)"
            onChangeText={(text) => setDescriptoion(text)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Category"
            onChangeText={(text) => setCategory(text)}
          /> */}
          <Input
            placeholder="Name your tasks"
            onChangeText={(text) => setName(text)}
          />
          <Input
            placeholder="Description (optional)"
            onChangeText={(text) => setDescriptoion(text)}
          />
          <Input
            placeholder="Category"
            onChangeText={(text) => setCategory(text)}
          />
          <View style={styles.buttonsContainer}>
            <Button
              title="Close"
              containerStyle={styles.button}
              // style={styles.button}
              onPress={() => {
                toggleOverlay();
                setName("");
                setDescriptoion("");
                setCategory("");
              }}
              type="clear"
            />
            <Button
              title="Save"
              containerStyle={styles.button}
              // style={styles.button}
              onPress={handleSave}
              type="clear"
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
    // borderWidth: 1,
    // borderColor: "black",
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
    marginTop: 5,
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
