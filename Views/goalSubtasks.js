import React, { useLayoutEffect, useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Header, Button, Text, Input, FAB } from "@rneui/base";

import {
    useRoute,
    useNavigation,
    useFocusEffect,
  } from "@react-navigation/native";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { AntDesign } from "@expo/vector-icons";

export default function GoalSubtasks() {
    const route = useRoute();
    const navigation = useNavigation();
    const { goalName, goalId } = route.params;

    const [inputTaskName, setInputTaskName] = useState("");


    useLayoutEffect(() => {
        navigation.setOptions({
          title: goalName,
          headerShown: false,
        });
    }, [navigation, goalName]);

    const left = () => {
      return (
        <Button
        icon={<AntDesign name="arrowleft" size={24} color="black" />}
        buttonStyle={{backgroundColor: "gray"}}
        onPress={() => navigation.goBack()}
        />
      );
    };
  
    const center = () => {
      return (
        <View style={styles.containerTaskNameStyle}>
          <Text h4 style={styles.taskNameStyle}>
            {goalName}
          </Text>
        </View>
      );
    };
  
  const right = () => {
    return (
      <Button
      icon={<FontAwesome6 name="check-double" size={24} color="black" />}
      buttonStyle={{backgroundColor: "gray"}}
      containerStyle={{ borderRadius: 30 }}
      // onPress={}
      />
  
    );
  };

  return (
    <View style={{ flex: 1 }}>
        <Header
          leftComponent={left}
          centerComponent={center}
          rightComponent={right}
          leftContainerStyle={styles.headerContainerStyle}
          centerContainerStyle={styles.headerContainerStyle}
          rightContainerStyle={styles.headerContainerStyle}
          containerStyle={{backgroundColor: "gray"}}
        />
        <Text>Goal Subtasks, did'n finish</Text>
        <FAB
          placement="right"
          style={styles.fabStyle}
          // onPress={toggleOverlay}
          icon={() => {
            return <AntDesign name="plus" size={24} color="#fff" />;
          }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    headerContainerStyle: {
      justifyContent: "center",
      backgroundColor: "gray",
    },
    containerTaskNameStyle: {
      borderColor: "black",
      borderWidth: 2,
      borderRadius: 20,
  
      backgroundColor: "#3B3131",
    },
    taskNameStyle: {
      color: "#fff",
      fontWeight: "500",
      fontSize: 20,
      padding: 7,
    },
    fabStyle: {
      paddingRight: 10,
      paddingBottom: 20,
    },
  });
  