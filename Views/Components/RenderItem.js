import React, { useState, useEffect } from "react";
import { ListItem, Avatar, Button, Text, Icon } from "@rneui/base";
import { StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const [expanded, setExpanded] = useState(false);

  return (
    <ListItem.Accordion
      content={
        <>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.CheckBox />
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
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
        </ListItem.Content>
        <ListItem.CheckBox />
      </ListItem.Swipeable>
    </ListItem.Accordion>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {},
});
