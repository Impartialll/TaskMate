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

    const center = () => {
    return (
        <View style={styles.containerTaskNameStyle}>
        <Text h4 style={styles.taskNameStyle}>
            {goalName}
        </Text>
        </View>
    );
    };

  return (
    <View style={{ flex: 1 }}>
        <Header
        leftComponent={{
            icon: "arrow-back",
            color: "#fff",
            onPress: () => navigation.goBack(),
        }}
        centerComponent={center}
        rightComponent={
            <Button
            icon={<FontAwesome6 name="check-double" size={24} color="#fff" />}
            // buttonStyle={{}}
            containerStyle={{ borderRadius: 30 }}
            // onPress={}
            />
        }
        leftContainerStyle={styles.headerContainerStyle}
        centerContainerStyle={styles.headerContainerStyle}
        rightContainerStyle={styles.headerContainerStyle}
        />
        <Text>Goal Subtasks</Text>
        <FAB
        placement="right"
        style={styles.fabStyle}
        // onPress={toggleOverlay}
        icon={() => {
          return <AntDesign name="plus" size={24} color="black" />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    headerContainerStyle: {
      justifyContent: "center",
    },
    containerTaskNameStyle: {
      borderColor: "black",
      borderWidth: 2,
      borderRadius: 20,
  
      backgroundColor: "#fff",
    },
    taskNameStyle: {
      padding: 7,
    },
    fabStyle: {
      paddingRight: 10,
      paddingBottom: 20,
    },
  });
  