import React, { useState, useEffect } from "react";
import { ListItem, Avatar, Button, Text, Icon } from "@rneui/base";
import { StyleSheet, View, Dimensions } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Swipeable } from "react-native-gesture-handler";

const { width } = Dimensions.get('window');

export default function RenderItem({ item, fetchTasks, navigation }) {
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

  const rightContent = (reset) => {
    return (
      <Button
        title="Info"
        onPress={() => {
          alert("Info pressed");
          reset();
        }}
        icon={{ name: "info", color: "white" }}
        buttonStyle={{ minHeight: "100%" }}
      />
    );
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
        // rightContent={}
        containerStyle={styles.container}
        style={styles.item}
      >
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            <Text>{item.reminderDate}</Text>
          </ListItem.Content>
          <ListItem.CheckBox checked={checked} onPress={() => setChecked(!checked)} />
      </ListItem.Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    width: width * 0.9,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
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
