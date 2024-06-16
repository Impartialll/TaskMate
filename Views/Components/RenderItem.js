import React, { useState, useEffect, useCallback } from "react";
import { ListItem, Avatar, Button, Text, Icon } from "@rneui/base";
import { StyleSheet, View, Dimensions } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { cancelNotification } from "../notifications/NotificationService";
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

  const getCompletedCount = async () => {
    const count = await AsyncStorage.getItem("completedCount");
    return count ? parseInt(count, 10) : 0;
  };

  const setCompletedCount = async (count) => {
    await AsyncStorage.setItem("completedCount", count.toString());
  };

  const incrementCompletedCount = async () => {
    const currentCount = await getCompletedCount();
    await setCompletedCount(currentCount + 1);
  };

  const decrementCompletedCount = async () => {
    const currentCount = await getCompletedCount();
    await setCompletedCount(currentCount > 0 ? currentCount - 1 : 0);
  };

  // const completeHandler = async (id) => {
  //   try {
  //     const existingTasks = await AsyncStorage.getItem("tasks");
  //     let tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
  //     let updatedTask = null;

  //     tasksArray = tasksArray.map((task) => {
  //       if (task.id === id) {
  //         task.completed = !task.completed;
  //         updatedTask = task;
  //       }
  //       return task;
  //     });

  //     await AsyncStorage.setItem("tasks", JSON.stringify(tasksArray));

  //     if (updatedTask) {
  //       if (updatedTask.completed) {
  //         await incrementCompletedCount();
  //       } else {
  //         await decrementCompletedCount();
  //       }
  //     }

  //     fetchTasks();
  //   } catch (error) {
  //     console.error("Error completing the task:", error);
  //   }
  // };

  const completeHandler = async (id) => {
    try {
      const existingTasks = await AsyncStorage.getItem("tasks");
      let tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
      let updatedTask = null;
  
      tasksArray = tasksArray.map((task) => {
        if (task.id === id) {
          task.completed = !task.completed;
          updatedTask = task;
        }
        return task;
      });
  
      await AsyncStorage.setItem("tasks", JSON.stringify(tasksArray));
  
      console.log(updatedTask.notificationScheduled);
      if (updatedTask) {
        if (updatedTask.completed) {
          await incrementCompletedCount();
          // Скасувати сповіщення, якщо воно було заплановане
          if (updatedTask.notificationScheduled) {
            await cancelNotification(id);
            updatedTask.notificationScheduled = false;
          }
        } else {
          await decrementCompletedCount();
          // Планувати сповіщення, якщо воно не було заплановане в минулому
          if (!updatedTask.notificationScheduled) {
            await scheduleNotification(id, updatedTask.name, updatedTask.reminderDate);
            updatedTask.notificationScheduled = true;
          }
        }
      }
      console.log(updatedTask.notificationScheduled);
  
      fetchTasks();
    } catch (error) {
      console.error("Error completing the task:", error);
    }
  };

  const onSubtaskCompletionChange = async (subtaskId, completed) => {
    try {
      const existingTasks = await AsyncStorage.getItem("tasks");
      let tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
      
      tasksArray = tasksArray.map((task) => {
        if (task.id === item.id) {
          const subtaskToUpdate = task.subtasks.find(subtask => subtask.id === subtaskId);
          if (subtaskToUpdate) {
            subtaskToUpdate.completed = completed;
          }
        }
        return task;
      });
  
      await AsyncStorage.setItem("tasks", JSON.stringify(tasksArray));
  
      if (completed) {
        await incrementCompletedCount();
      } else {
        await decrementCompletedCount();
      }
  
      fetchTasks();
    } catch (error) {
      console.error("Error updating subtask completion:", error);
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

  // const onLongPress = async () => {
  //   const existingTasks = await AsyncStorage.getItem('tasks');
  //   const tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
  //   const task = tasksArray.find(t => t.id === item.id);
  
  //   navigation.navigate("Subtasks", {
  //     id: task.id,
  //     name: task.name,
  //     description: task.description,
  //     category: task.category,
  //     date: task.reminderDate,
  //     categories: categories,
  //     subtasks: task.subtasks || [],
  //   });
  // };

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

  // const completedSubtasksCount = item.subtasks.filter(subtask => subtask.completed).length;
  // const totalSubtasksCount = item.subtasks.length;

  // const [checked, setChecked] = useState(false);
  const [checked, setChecked] = useState(item.completed);
  return (
      <ListItem.Swipeable
        bottomDivider
        onLongPress={onLongPress}
        leftContent={leftContent}
        containerStyle={[styles.container, checked && styles.completed]}
        onPress={() => console.log(formatReminderDate(item.reminderDate))}
        >
          <ListItem.Content style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 0}}>
            <FontAwesome5 name="running" size={24} color="black" style={{marginLeft: 5}} />
            <ListItem.Title style={{paddingLeft: 5, width: 100,  textAlign: "left", fontWeight: "700"}}>{item.name}</ListItem.Title>
            <ListItem.Subtitle style={{width: 50, textAlign: "center", fontWeight: "700"}}>{}</ListItem.Subtitle>
            <View style={{width: 100}} >
              {checked === true ? (
                <>
                  <Text style={{marginRight: 5, textAlign: "center", fontWeight: "700", paddingVertical: 5, fontSize: 16}}>Виконане</Text>
                  <Text style={{marginRight: 5, textAlign: "center", fontWeight: "700", paddingVertical: 5, fontSize: 16}}>{formatReminderDate(item.reminderDate)[1]}</Text>
                </>
              ) : (
                <>
                  <Text style={{marginRight: 5, textAlign: "center", fontWeight: "700", paddingVertical: 5, fontSize: 16}}>{formatReminderDate(item.reminderDate)[0]}</Text>
                  <Text style={{marginRight: 5, textAlign: "center", fontWeight: "700", paddingVertical: 5, fontSize: 16}}>{formatReminderDate(item.reminderDate)[1]}</Text>
                </>
              )}
            </View>
          </ListItem.Content>
          <ListItem.CheckBox
            checked={checked}
            onPress={() => {
              setChecked(!checked);
              completeHandler(item.id);
            }}
            containerStyle={{borderRadius: 20}}
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
    backgroundColor: '#d3d3d3',
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
