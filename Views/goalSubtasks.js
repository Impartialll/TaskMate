import React, { useLayoutEffect, useCallback, useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Header, Button, Text, Input, FAB } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from 'expo-status-bar';
import uuid from 'react-native-uuid';

import {
    useRoute,
    useNavigation,
    useFocusEffect,
  } from "@react-navigation/native";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { AntDesign } from "@expo/vector-icons";
import SubGoalRenderItem from "./Components/SubGoalRenderItem";
import NewSubGoal from "./Components/NewSubGoal";
import SubGoalHeader from "./Components/SubGoalHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import MyModal from "./fab/Modal";

export default function GoalSubtasks() {
    const route = useRoute();
    const navigation = useNavigation();
    // const { goalName, goalId } = route.params;
    const { goal, id, name, description, subgoals, reminderDate } = route.params;

    const [subGoalsList, setSubGoalsList] = useState(subgoals);
    const [visible, setVisible] = useState(false);

    const [date, setDate] = useState(new Date());

    const addSubtask = async (newSubtask) => {
      const newSubtaskData = {
        id: uuid.v4(),
        name: newSubtask,
        checked: false,
      };
      
      const updatedSubtasks = [...subgoals, newSubtaskData];
      setSubGoalsList(updatedSubtasks);
  
      const existingTasks = await AsyncStorage.getItem('goals');
      const tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
      const taskIndex = tasksArray.findIndex(t => t.id === id);
      tasksArray[taskIndex].subgoals = updatedSubtasks;
      await AsyncStorage.setItem('goals', JSON.stringify(tasksArray));
    };
  
    const deleteSubtask = async (subtaskId) => {
      const updatedSubtasks = subgoals.filter(subtask => subtask.id !== subtaskId);
      setSubGoalsList(updatedSubtasks);
  
      const existingTasks = await AsyncStorage.getItem('goals');
      const tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
      const taskIndex = tasksArray.findIndex(t => t.id === id);
      tasksArray[taskIndex].subgoals = updatedSubtasks;
      await AsyncStorage.setItem('goals', JSON.stringify(tasksArray));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
          title: name,
          headerShown: false,
        });
    }, [navigation, name]);

    const toggleOverlay = () => {
      setVisible(!visible);
    };

    const renderItem = ({ item }) => (
      <SubGoalRenderItem
        item={item}
        deleteSubtask={deleteSubtask}
        />
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header ViewComponent={() =>
      <SubGoalHeader
        item={goal}
        name={name}
        description={description}
        id={id}
        date={reminderDate}
        navigation={navigation}
        />}/>
      <FlatList
        data={subGoalsList}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{flex: 1, marginVertical: 10}}/>}
        renderItem={renderItem}
        style={{paddingTop: 20}}
      />
      <FAB
        placement="right"
        style={styles.fabStyle}
        onPress={toggleOverlay}
        icon={() => {
          return <AntDesign name="plus" size={24} color="#fff" />;
        }}
        />
      <NewSubGoal
        visible={visible}
        onClose={toggleOverlay}
        onCreate={addSubtask}
        />
        {/* <MyModal
          isVisible={}
          toggleOverlay={}

          /> */}
        <StatusBar style="dark" backgroundColor="#4285F4" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    fabStyle: {
      paddingRight: 10,
      paddingBottom: 20,
    },
  });
  