import React, { useState, useEffect } from "react";
import { ListItem, Avatar, Button, Text } from "@rneui/base";
import { StyleSheet } from "react-native";
import tasks from "../../services/tasks";

export default function RenderItem({ item, fetchTasks, navigation }) {
  const [isSwiped, setIsSwiped] = useState(false);

  const delHandler = async (id) => {
    try {
      await tasks.deleteObject(id);
      fetchTasks();
    } catch (error) {
      console.error("Error deletion the task:", error);
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
          title="Info"
          onPress={() => {
            setIsSwiped(false);
            alert("Info pressed");
            reset();
          }}
          icon={{ name: "info", color: "white" }}
          buttonStyle={{ minHeight: "100%" }}
        />
    );
  };

  const rightContent = (reset) => {
    return (
        <Button
          title="Delete"
          onPress={() => {
            setIsSwiped(false);
            delHandler(item.id);
            reset();
          }}
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
        />
    );
  };

  return (
    <ListItem.Swipeable
      bottomDivider
      onLongPress={onLongPress}
      leftContent={leftContent}
      rightContent={rightContent}
      containerStyle={styles.container}
      style={styles.item}
    >
      <Avatar title={item.name[0]} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  item: {
  },
});
