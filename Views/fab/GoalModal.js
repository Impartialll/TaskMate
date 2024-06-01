import {
    View,
    Modal,
    StyleSheet,
  } from "react-native";
  import React, { useState } from "react";
  
  import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
  
  import { Button, Input, Text } from "@rneui/base";

  import { FontAwesome5 } from '@expo/vector-icons';
  import { MaterialCommunityIcons } from '@expo/vector-icons';

  import goals from "../../services/goals";

export default function GoalModal({ isVisible, toggleOverlay }) {
    const [inputName, setName] = useState("");
    const [inputDescription, setDescriptoion] = useState("");

    const handleSave = () => {
      if (inputName != "") {
        addHandler(inputName, inputDescription);
      }
      toggleOverlay();
    };
  
    const addHandler = async (name, description) => {
      try {
        const newData = {
          name: name.trim(),
          description: description.trim()
        };
        await goals.create(newData);
      } catch (error) {
        console.error("Error adding the task:", error);
      }
    };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeaderText}>New goal</Text>
          <Input
      placeholder="Goal name"
      leftIcon={<FontAwesome5 name="running" size={24} color="black" />}
      onChangeText={(text) => setName(text)}
      />
          <Input
      placeholder="Description"
      leftIcon={<MaterialCommunityIcons name="human" size={24} color="black" />}
      onChangeText={(text) => setDescriptoion(text)}
      />
          <View style={styles.closeSaveContainer}>
            <Button
              title="Close"
              containerStyle={styles.button}
              // style={styles.button}
              onPress={toggleOverlay}
              type="clear"
            />
            <Button
              title="Save"
              containerStyle={styles.button}
              // style={styles.button}
              onPress={handleSave}
              type="clear"
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    dateTimePickerContainer: {
      justifyContent: "space-around",
    },
    closeSaveContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    button: {
      marginTop: 5,
      marginHorizontal: "20%",
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
    textInput: {
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 5,
      padding: 8,
      marginBottom: 10,
      width: "100%",
    },
  });
  