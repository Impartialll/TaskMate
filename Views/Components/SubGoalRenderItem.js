import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, Text, Button } from '@rneui/base'
import { MaterialIcons } from '@expo/vector-icons';

export default function SubGoalRenderItem({ item, deleteSubtask }) {
    const [checked, setChecked] = useState(false);

    const leftContent = (reset) => {
        return (
          <Button
            title="Delete"
            onPress={() => {
              deleteSubtask(item.id);
              reset();
            }}
            icon={{ name: "delete", color: "white" }}
            buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
          />
        );
      };

    const toggleSubtaskCompletion = () => {
      setChecked(!checked);
      onSubtaskCompletionChange(item.id, !checked);
    };
  return (
    <ListItem.Swipeable
      bottomDivider
      leftContent={leftContent}
      containerStyle={styles.container}
    //   onPress={() => setChecked(!checked)}
      >
        <ListItem.Content style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <MaterialIcons name="subject" size={24} color="black" style={{paddingLeft: 5}} />
            <ListItem.Title style={{textAlign: "center", fontWeight: "700", flex: 1, paddingLeft: 10}}>{item.name}</ListItem.Title>
        </ListItem.Content>
        <ListItem.CheckBox
          checked={checked}
          onPress={toggleSubtaskCompletion}
          uncheckedIcon={<MaterialIcons name="radio-button-unchecked" size={28} color="black" />}
          checkedIcon={<MaterialIcons name="radio-button-checked" size={28} color="black" />}
          />
    </ListItem.Swipeable>
  )
}

const styles = StyleSheet.create({})