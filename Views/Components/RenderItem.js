import React, { useState, useEffect } from "react";
import { ListItem, Avatar, Button, Text } from "@rneui/base";
import { StyleSheet } from "react-native";
import tasks from "../../services/tasks";

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
      // onSwipe={() => setIsSwiped(true)}
      // onSwipeRelease={() => setIsSwiped(false)}

      leftContent={(reset) => (
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
      )
      }
      rightContent={(reset) => (        <Button
        title="Delete"
        onPress={() => {
          setIsSwiped(false);
          delHandler(item.id);
          reset();
        }}
        icon={{ name: "delete", color: "white" }}
        buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
      />)
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
