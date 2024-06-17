import React, { useLayoutEffect, useCallback, useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Header, Button, Text, Input, FAB, Dialog } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from 'expo-status-bar';
import uuid from 'react-native-uuid';
import { scheduleNotification } from "./notifications/NotificationService";

import {
    useRoute,
    useNavigation,
    useFocusEffect,
  } from "@react-navigation/native";

import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import SubGoalRenderItem from "./Components/SubGoalRenderItem";
import NewSubGoal from "./Components/NewSubGoal";
import SubGoalHeader from "./Components/SubGoalHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import MyFAB from "./fab/FAB";

export default function GoalSubtasks() {
    const route = useRoute();
    const navigation = useNavigation();
    // const { goalName, goalId } = route.params;
    const { goal, id, name, description, subgoals, reminderDate } = route.params;

    const [subGoalsList, setSubGoalsList] = useState(subgoals);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      loadSubGoals();
    }, []);

    const loadSubGoals = async () => {
      try {
        const existingTasks = await AsyncStorage.getItem('goals');
        if (existingTasks) {
          const tasksArray = JSON.parse(existingTasks);
          const updatedSubgoals = tasksArray.length > 0 ? tasksArray[0].subgoals : [];
          setSubGoalsList(updatedSubgoals);
        } else {
          setSubGoalsList([]);
        }
      } catch (error) {
        console.error('Error loading subgoals from AsyncStorage:', error);
      }
    };

    const [date, setDate] = useState(new Date());

    const addSubtask = async (newSubtask, reminderDate) => {
      const newSubtaskData = {
        id: uuid.v4(),
        name: newSubtask,
        reminderDate: reminderDate,
        checked: false,
      };
      
      const updatedSubtasks = [...subgoals, newSubtaskData];
      setSubGoalsList(updatedSubtasks);
        
      const existingTasks = await AsyncStorage.getItem('goals');
      const tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
      const taskIndex = tasksArray.findIndex(t => t.id === id);
      tasksArray[taskIndex].subgoals = updatedSubtasks;
      await AsyncStorage.setItem('goals', JSON.stringify(tasksArray));
      if (reminderDate) {
        await scheduleNotification(newSubtaskData.id, newSubtaskData.name, newSubtaskData.reminderDate);
      }
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

    const deleteGoal = async (goalId) => {
      try {
        const existingGoals = await AsyncStorage.getItem('goals');
        if (!existingGoals) {
          console.error("No goals found");
          return;
        }
        const goalsArray = JSON.parse(existingGoals);
        const goalIndex = goalsArray.findIndex(goal => goal.id === goalId);
        if (goalIndex === -1) {
          console.error(`Goal with id ${goalId} not found`);
          return;
        }
        goalsArray.splice(goalIndex, 1);
        await AsyncStorage.setItem('goals', JSON.stringify(goalsArray));
      } catch (error) {
        console.error("Error deleting the goal:", error);
      }
    };
    
    const handleDeleteGoal = async (goalId) => {
      await deleteGoal(goalId);
    };

    const toggleSubtaskChecked = async (goalId, subtaskId) => {
      try {
        const existingGoals = await AsyncStorage.getItem('goals');
        if (!existingGoals) {
          console.error("No goals found");
          return;
        }
        const goalsArray = JSON.parse(existingGoals);
        const goalIndex = goalsArray.findIndex(goal => goal.id === goalId);
        if (goalIndex === -1) {
          console.error(`Goal with id ${goalId} not found`);
          return;
        }
        const subtaskIndex = goalsArray[goalIndex].subgoals.findIndex(subtask => subtask.id === subtaskId);
        if (subtaskIndex === -1) {
          console.error(`Subtask with id ${subtaskId} not found`);
          return;
        }
        goalsArray[goalIndex].subgoals[subtaskIndex].checked = !goalsArray[goalIndex].subgoals[subtaskIndex].checked;
        await AsyncStorage.setItem('goals', JSON.stringify(goalsArray));
        const updatedSubgoals = goalsArray[goalIndex].subgoals;
        setSubGoalsList(updatedSubgoals);
      } catch (error) {
        console.error("Error toggling the subtask checked status:", error);
      }
    };

    const handleToggleSubtask = async (goalId, subtaskId) => {
      await toggleSubtaskChecked(goalId, subtaskId);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
          title: name,
          headerShown: false,
        });
    }, [navigation, name]);

    const renderItem = ({ item }) => (
      <SubGoalRenderItem
        goal={goal}
        item={item}
        deleteSubtask={deleteSubtask}
        onSubtaskCompletionChange={handleToggleSubtask}
        />
    );

    const [isFABModalClosed, setIsFABModalClosed] = useState(false);
    useEffect(() => {
      if (isFABModalClosed) {
        loadSubGoals();
        setIsFABModalClosed(false);
      }
    }, [isFABModalClosed]);
  
    const handleModalClose = () => {
      setIsFABModalClosed(true);
    };

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
          <MyFAB
              onClose={handleModalClose}
              updateData={loadSubGoals}
              date={date}
              setDate={setDate}
              title_state={"Нове підзавдання до цілі"}
              placeholder_state={"Назва підзавдання"}
              state="subgoals"
              addSubtask={addSubtask}
              />
        <FAB
          placement="left"
          style={{paddingLeft: 10, paddingBottom: 55}}
          onLongPress={() => {
            handleDeleteGoal(goal.id);
            navigation.goBack();
          }}
          icon={() => <FontAwesome6 name="trash-can" size={24} color="#fff" />}
          />
        <StatusBar style="auto" backgroundColor="#4285F4" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    fabStyle: {
      paddingRight: 10,
      paddingBottom: 20,
    },
  });
  