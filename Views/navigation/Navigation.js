import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import Subtasks from "../subtasks";
import GoalSubtasks from "../goalSubtasks";

const Stack = createNativeStackNavigator();

export default function Navigation({ tasks, cats, setCat, fetchTasks, fetchGoals }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          children={() => (
            <TabNavigator/>
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Subtasks"
          children={() => <Subtasks fetchTasks={fetchTasks} />}
        />
        <Stack.Screen
          name="Goal Subtasks"

          children={() => <GoalSubtasks />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
