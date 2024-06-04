import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  StyleSheet,
} from "react-native";
import { Button, Input, Text } from "@rneui/base";

import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import tasks from "../../services/tasks";

export default function MyModal({ isVisible, toggleOverlay, updateTasks, date, setDate }) {
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

  // const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (isVisible) {
      setDate(new Date());
    }
  }, [isVisible]);

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

  const onCloseModal = () => {
    toggleOverlay();
    setName("");
    setDescriptoion("");
    setCategory("");
    setDate(new Date());
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeaderText}>Нове завдання</Text>
          <Input
            inputStyle={{fontSize: 16}}
            placeholder="Назва завдання"
            leftIcon={<FontAwesome5 name="running" size={24} color="black" />}
            onChangeText={(text) => setName(text)}
          />
          <Input
            inputStyle={{fontSize: 16}}
            placeholder="Опис (за бажанням)"
            leftIcon={<MaterialCommunityIcons name="human" size={24} color="black" />}
            onChangeText={(text) => setDescriptoion(text)}
          />
          <View style={styles.dateTimePickerContainer}>
            <Button onPress={showDatepicker} title="Show date picker!" />
            <Button onPress={showTimepicker} title="Show time picker!" />
          </View>
          <Text>selected: {date.toLocaleString()}</Text>
          <View style={styles.closeSaveContainer}>
            <Button
              title="Скасувати"
              titleStyle={{fontSize: 16}}
              size="sm"
              containerStyle={styles.button}
              buttonStyle={{borderWidth: 1, borderRadius: 4}}
              onPress={onCloseModal}
              type="outline"
              />
            <Button
              title="Зберегти"
              titleStyle={{fontSize: 16}}
              size="sm"
              color="secondary"
              containerStyle={styles.button}
              onPress={handleSave}
              type="solid"
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
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 4,
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
});
