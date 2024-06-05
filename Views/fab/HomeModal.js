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
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyModal({ isVisible, toggleOverlay, updateTasks, date, setDate }) {
  const [inputName, setName] = useState("");
  const [inputDescription, setDescriptoion] = useState("");
  const [formattedDate, setFormattedDate] = useState(date.getHours());
  const [formattedTime, setFormattedTime] = useState(date.getHours());

  const roundToNearestTenMinutes = (date) => {
    const minutes = date.getMinutes();
    const roundedMinutes = Math.ceil(minutes / 10) * 10;
    if (roundedMinutes === 60) {
      date.setHours(date.getHours() + 1);
      date.setMinutes(0);
    } else {
      date.setMinutes(roundedMinutes);
    }
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  };

  const getFormattedDate = (date) => {
    const daysOfWeek = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];
    const months = ["січ.", "лют.", "берез.", "квіт.", "трав.", "черв.", "лип.", "серп.", "верес.", "жовт.", "лист.", "груд."];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    return `${dayOfWeek}, ${date.getDate()} ${month}`;
  };

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
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
  };

  const handleSave = () => {
    if (inputName != "") {
      addHandler(inputName, inputDescription);
    }
    toggleOverlay();
  };

  const addHandler = async (name, description) => {
    try {
      const newData = {
        name: name.trim(),
        description: description.trim(),
        category: "none",
      };
      await tasks.create(newData);
    } catch (error) {
      console.error("Error adding the task:", error);
    }
  };

  // const addHandler = async (name, description) => {
  //   try {
  //     const newData = {
  //       name: name.trim(),
  //       description: description.trim(),
  //       category: "none",
  //     };
  //     // Оновлення локальних даних у AsyncStorage
  //     const existingTasks = await AsyncStorage.getItem('tasks');
  //     const tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
  //     tasksArray.push(newData);
  //     await AsyncStorage.setItem('tasks', JSON.stringify(tasksArray));
  //   } catch (error) {
  //     console.error("Error adding the task:", error);
  //   }
  // };

  useEffect(() => {
    if (isVisible) {
      setDate(roundToNearestTenMinutes(new Date()));
    }
  }, [isVisible]);

  useEffect(() => {
    const days = getFormattedDate(date);
    const time = date.getHours() + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
    setFormattedDate(days);
    setFormattedTime(time);
  }, [date]);

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeaderText}>Нове завдання</Text>
            <Input
              inputStyle={{fontSize: 16}}
              placeholder="Назва завдання"
              leftIcon={<FontAwesome5 name="running" size={24} color="black" style={{padding: 5}} />}
              onChangeText={(text) => setName(text)}
            />
            <Input
              inputStyle={{fontSize: 16}}
              placeholder="Опис (не обов'язково)"
              leftIcon={<MaterialCommunityIcons name="human" size={24} color="black" style={{padding: 3}} />}
              onChangeText={(text) => setDescriptoion(text)}
            />
          <View style={styles.dateTimePickerContainer}>
            <Button 
              containerStyle={{flex: 1, padding: 10}}
              buttonStyle={{paddingHorizontal: 0,}}
              title={formattedDate}
              onPress={showDatepicker}
              type="clear"
            />
            <Button 
              containerStyle={{flex: 1, padding: 10}}
              title={formattedTime}
              onPress={showTimepicker}
              type="clear"
            />
          </View>
          {/* <Button title="press me" onPress={() => console.log(date.toLocaleString())} /> */}
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
    flexDirection: "row",
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
