import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";

import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

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
      // const trimmedName = name.trim();
      // const trimmedDescription = description.trim();
      // const trimmedCategory = category.trim();
      const newData = {
        name: name.trim(),
        description: description.trim(),
        category: category.trim(),
      };
      await tasks.create(newData);
      updateTasks();
    } catch (error) {
      console.error("Error adding the task:", error);
    }
  };

  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeaderText}>New task</Text>
          <Input
            placeholder="Name your tasks"
            style={styles.textInput}
            onChangeText={(text) => setName(text)}
          />
          <Input
            placeholder="Description (optional)"
            style={styles.textInput}
            onChangeText={(text) => setDescriptoion(text)}
          />
          {/* <Input
            placeholder="Category"
            onChangeText={(text) => setCategory(text)}
          /> */}
          <View style={styles.dateTimePickerContainer}>
            <Button onPress={showDatepicker} title="Show date picker!" />
            <Button onPress={showTimepicker} title="Show time picker!" />
          </View>
          <Text>selected: {date.toLocaleString()}</Text>
          <View style={styles.closeSaveContainer}>
            <Button
              title="Close"
              containerStyle={styles.button}
              // style={styles.button}
              onPress={() => {
                toggleOverlay();
                setName("");
                setDescriptoion("");
                setCategory("");
                console.log(date);
                setDate(new Date());
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
  dateTimePickerContainer: {
    justifyContent: "space-around",
  },
  closeSaveContainer: {
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
