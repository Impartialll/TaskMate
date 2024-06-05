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
          <Text style={styles.modalHeaderText}>Нова ціль</Text>
          <Input
            placeholder="Назва цілі"
            leftIcon={<FontAwesome5 name="running" size={24} color="black" style={{padding: 5}} />}
            onChangeText={(text) => setName(text)}
            inputStyle={{fontSize: 16}}
          />
          <Input
            placeholder="Опис"
            leftIcon={<MaterialCommunityIcons name="human" size={24} color="black" style={{padding: 5}} />}
            onChangeText={(text) => setDescriptoion(text)}
            inputStyle={{fontSize: 16}}
          />
          <View style={styles.closeSaveContainer}>
            <Button
              title="Скасувати"
              titleStyle={{fontSize: 16}}
              size="sm"
              containerStyle={styles.button}
              buttonStyle={{borderWidth: 1, borderRadius: 4}}
              onPress={toggleOverlay}
              type="outline"
            />
            <Button
              title="Зберегти"
              titleStyle={{fontSize: 16}}
              size="sm"
              color="secondary"
              containerStyle={styles.button}
              onPress={handleSave}
              type="solid"
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
      flex: 1,
      marginHorizontal: 10,
      borderRadius: 4,
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
  