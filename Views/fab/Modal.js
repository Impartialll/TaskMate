import React, { useState, useEffect } from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Button, Input, Text } from "@rneui/base";
import { TouchableWithoutFeedback } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import uuid from 'react-native-uuid';

import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { scheduleNotification } from "../notifications/NotificationService";

export default function MyModal({ isVisible, toggleOverlay, updateData, date, setDate, title_state, placeholder_state, state, addSubtask }) {
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
      if (state === "tasks") {
        addTask(inputName, inputDescription, date);
      } else if (state === "goals") {
        addGoal(inputName, inputDescription, date)
      } else if (state === "subgoals") {
        addSubtask(inputName, date);
      }
    }
    onCloseModal();
  };

  const addTask = async (name, description, reminderDate) => {
    try {
      const newData = {
        id: uuid.v4(),
        name: name.trim(),
        description: description.trim(),
        category: "none",
        completed: false,
        reminderDate: reminderDate ? reminderDate.toISOString() : null,
      };
      const existingTasks = await AsyncStorage.getItem('tasks');
      const tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
      tasksArray.push(newData);
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksArray));
      if (reminderDate) {
        await scheduleNotification(newData.id, newData.name, newData.reminderDate);
      }
      updateData();
    } catch (error) {
      console.error("Error adding the task:", error);
    }
  };

  const addGoal = async (name, description, reminderDate) => {
    try {
      const newData = {
        id: uuid.v4(),
        name: name.trim(),
        description: description.trim(),
        reminderDate: reminderDate ? reminderDate.toISOString() : null,
      };
      const existingGoals = await AsyncStorage.getItem('goals');
      const goalsArray = existingGoals ? JSON.parse(existingGoals) : [];
      goalsArray.push(newData);
      await AsyncStorage.setItem('goals', JSON.stringify(goalsArray));
      if (reminderDate) {
        await scheduleNotification(newData.id, newData.name, newData.reminderDate);
      }
      updateData();
    } catch (error) {
      console.error("Error adding the goal:", error);
    }
  };

  // const loadSubGoals = async () => {
  //   try {
  //     const existingTasks = await AsyncStorage.getItem('goals');
  //     if (existingTasks) {
  //       const tasksArray = JSON.parse(existingTasks);
  //       const updatedSubgoals = tasksArray.length > 0 ? tasksArray[0].subgoals : [];
  //       setSubGoalsList(updatedSubgoals);
  //     } else {
  //       setSubGoalsList([]);
  //     }
  //   } catch (error) {
  //     console.error('Error loading subgoals from AsyncStorage:', error);
  //   }
  // };

  useEffect(() => {
    if (isVisible) {
      setDate(roundToNearestTenMinutes(new Date()));
    }
  }, [isVisible]);

  useEffect(() => {
    const days = getFormattedDate(date);
    // const time = date.getHours() + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    setFormattedDate(days);
    setFormattedTime(time);
  }, [date]);

  return (
    <Modal visible={isVisible} animationType="slide" transparent statusBarTranslucent={true}>
      <TouchableWithoutFeedback onPress={onCloseModal}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeaderText}>{title_state}</Text>
                <Input
                  inputStyle={{fontSize: 16}}
                  placeholder={placeholder_state}
                  leftIcon={<FontAwesome5 name="running" size={24} color="black" style={{padding: 5}} />}
                  onChangeText={(text) => setName(text)}
                  />
                  {state != "subgoals" ? (<Input
                  inputStyle={{fontSize: 16}}
                  placeholder="Опис (не обов'язково)"
                  leftIcon={<MaterialCommunityIcons name="human" size={24} color="black" style={{padding: 3}} />}
                  onChangeText={(text) => setDescriptoion(text)}
                  />) : (null)}

              <View style={styles.dateTimePickerContainer}>
                <Button 
                  containerStyle={{paddingHorizontal: 5}}
                  buttonStyle={{padding: 0}}
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
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
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
    alignItems: "center",
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
