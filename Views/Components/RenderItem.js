import React, { useState, useEffect } from "react";
import { ListItem, Avatar, Button, Text } from "react-native-elements";
import { StyleSheet } from "react-native";
import tasks from "../../services/tasks";

import { Swipeable, RectButton } from "react-native-gesture-handler";

export default function RenderItem({ item, fetchData, navigation }) {
  const [isSwiped, setIsSwiped] = useState(false);

  const delHandler = async (id) => {
    try {
      await tasks.deleteObject(id);
      fetchData();
    } catch (error) {
      console.error("Error deletion the task:", error);
    }
  };

  return (
    <ListItem.Swipeable
      bottomDivider
      onLongPress={() => {
        navigation.navigate("Subtasks", {
          taskId: item.id,
          taskName: item.name,
        });
      }}
      onSwipe={() => setIsSwiped(true)}
      onSwipeRelease={() => setIsSwiped(false)}
      leftContent={
        <Button
          title="Info"
          onPress={() => {
            setIsSwiped(false);
            alert("Info pressed");
          }}
          icon={{ name: "info", color: "white" }}
          buttonStyle={{ minHeight: "100%" }}
        />
      }
      rightContent={
        <Button
          title="Delete"
          onPress={() => {
            setIsSwiped(false);
            delHandler(item.id);
          }}
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
        />
      }
    >
      <Avatar title={item.name[0]} />
      <ListItem.Content style={styles.listContentStyle}>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
}

const styles = StyleSheet.create({
  listContentStyle: {},
});
