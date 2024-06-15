import React, { useState, useEffect, useCallback } from "react";
import { ListItem, Avatar, Button, Text, Icon } from "@rneui/base";
import { StyleSheet, View, Dimensions } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { format, isToday, isTomorrow, isYesterday, differenceInDays } from "date-fns";
import { uk } from "date-fns/locale"

export default function RenderItem({ item, fetchTasks, navigation, categories }) {

  function pluralizeDays(days) {
    if (days === 1) return 'день';
    if (days >= 2 && days <= 4) return 'дні';
    return 'днів';
  }
  
  function formatReminderDate(reminderDate) {
    const date = new Date(reminderDate);
    const now = new Date();
    
    let formattedDate = [];
    
    if (isToday(date)) {
      formattedDate = ['Сьогодні', format(date, 'HH:mm')];
    } else if (isTomorrow(date)) {
      formattedDate = ['Завтра', format(date, 'HH:mm')];
    } else if (isYesterday(date)) {
      formattedDate = ['Вчора', format(date, 'HH:mm')];
    } else {
      const daysDiff = differenceInDays(date, now);
    
      if (daysDiff < 0) {
        formattedDate = ['Прострочено', format(date, 'dd.MM')];
      } else {
        const daysText = pluralizeDays(daysDiff);
        formattedDate = [format(date, 'dd.MM'), `Ще ${daysDiff} ${daysText}`];
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

  // const onLongPress = () => {
  //   navigation.navigate("Subtasks", {
  //     id: item.id,
  //     name: item.name,
  //     description: item.description,
  //     category: item.category,
  //     date: item.reminderDate,
  //     categories: categories,
  //   });
  // };

  const onLongPress = async () => {
    const existingTasks = await AsyncStorage.getItem('tasks');
    const tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
    const task = tasksArray.find(t => t.id === item.id);
  
    navigation.navigate("Subtasks", {
      id: task.id,
      name: task.name,
      description: task.description,
      category: task.category,
      date: task.reminderDate,
      categories: categories,
      subtasks: task.subtasks || [],
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );
  
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
          <ListItem.Content style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 0}}>
            <FontAwesome5 name="running" size={24} color="black" style={{marginLeft: 5}} />
            <ListItem.Title style={{width: 80,  textAlign: "left", fontWeight: "700"}}>{item.name}</ListItem.Title>
            <ListItem.Subtitle style={{width: 50, textAlign: "center", fontWeight: "700"}}>{"4/5"}</ListItem.Subtitle>
            <View style={{width: 100}} >
              <Text style={{marginRight: 5, textAlign: "center", fontWeight: "700", paddingVertical: 5}}>{formatReminderDate(item.reminderDate)[0]}</Text>
              <Text style={{marginRight: 5, textAlign: "center", fontWeight: "700", paddingVertical: 5}}>{formatReminderDate(item.reminderDate)[1]}</Text>
            </View>
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
