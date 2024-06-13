import React, { useState, useEffect } from "react";
import { ListItem, Avatar, Button, Text, Icon } from "@rneui/base";
import { StyleSheet, View, Dimensions } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { format, isToday, isTomorrow, isYesterday, differenceInDays } from "date-fns";
import { uk } from "date-fns/locale"

export default function RenderItem({ item, fetchTasks, navigation }) {

  function formatReminderDate(reminderDate) {
    const date = new Date(reminderDate);
    const now = new Date();
  
    let formattedDate;
    
    if (isToday(date)) {
      formattedDate = `Сьогодні\n${format(date, 'HH:mm')}`;
    } else if (isTomorrow(date)) {
      formattedDate = `Завтра\n${format(date, 'HH:mm')}`;
    } else if (isYesterday(date)) {
      formattedDate = `Вчора\n${format(date, 'HH:mm')}`;
    } else {
      const daysDiff = differenceInDays(date, now);
  
      if (daysDiff < 0) {
        formattedDate = `Прострочено\n${format(date, 'dd.MM')}`;
      } else {
        formattedDate = `${format(date, 'dd.MM')}\nзалишилось ${daysDiff} дні(в)`;
      }
    }
  
    return formattedDate;
  }

  const delHandler = async (id) => {
    try {
      const existingTasks = await AsyncStorage.getItem("tasks");
      let tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
      tasksArray = tasksArray.filter((task) => task.id !== id);
      await AsyncStorage.setItem("tasks", JSON.stringify(tasksArray));
      fetchTasks();
    } catch (error) {
      console.error("Error deleting the task:", error);
    }
  };

  const onLongPress = () => {
    navigation.navigate("Subtasks", {
      taskId: item.id,
      taskName: item.name,
    });
  };

  const leftContent = (reset) => {
    return (
      <Button
        title="Delete"
        onPress={() => {
          delHandler(item.id);
          reset();
        }}
        icon={{ name: "delete", color: "white" }}
        buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
      />
    );
  };

  const [checked, setChecked] = useState(false);
  return (
      <ListItem.Swipeable
        bottomDivider
        onLongPress={onLongPress}
        leftContent={leftContent}
        containerStyle={styles.container}
        onPress={() => console.log(formatReminderDate(item.reminderDate))}
      >
          <ListItem.Content style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10}}>
            <FontAwesome5 name="running" size={24} color="black" style={{marginLeft: 5}} />
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            <Text style={{marginRight: 5, textAlign: "center"}}>{formatReminderDate(item.reminderDate)}</Text>
          </ListItem.Content>
          <ListItem.CheckBox
            checked={checked}
            onPress={() => setChecked(!checked)}
            uncheckedIcon={<MaterialIcons name="radio-button-unchecked" size={28} color="black" />}
            checkedIcon={<MaterialIcons name="radio-button-checked" size={28} color="black" />}
          />
      </ListItem.Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completed: {
    backgroundColor: '#d3d3d3', // Сірий колір для позначення виконаного завдання
  },
  leftSwipe: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '100%',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  rightSwipe: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '100%',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
});
