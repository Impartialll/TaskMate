import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import Subtasks from "../subtasks";

const Stack = createNativeStackNavigator();

export default function Navigation({ tasks, cats, setCat, fetchData }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          children={() => (
            <TabNavigator
              tasks={tasks}
              cats={cats}
              setCat={setCat}
              fetchData={fetchData}
            />
          )}
          options={{ headerShown: false }} // Приховати заголовок для вкладок
        />
        <Stack.Screen
          name="Subtasks"
          children={() => <Subtasks fetchData={fetchData} />}
          // options={{ title: "subtasks screen" }} // Додаткові опції, наприклад заголовок
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
