import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Divider, Text } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AboutHeader from "./Components/AboutHeader";
import TaskStatistics from "./Components/Chart";

export default function About() {
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const navigation = useNavigation();

  const fetchTasksCounts = async () => {
    try {
      const existingTasks = await AsyncStorage.getItem("tasks");
      if (existingTasks) {
        const tasksArray = JSON.parse(existingTasks);
        const activeTasks = tasksArray.filter(task => !task.completed);
        setActiveTasksCount(activeTasks.length);

        const completedTasks = tasksArray.filter(task => task.completed);
        setCompletedTasksCount(completedTasks.length);
      } else {
        setActiveTasksCount(0);
        setCompletedTasksCount(0);
      }
    } catch (error) {
      console.error("Error fetching tasks counts:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTasksCounts();
    }, [])
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <AboutHeader navigation={navigation} />
      <View style={{height: 90, flexDirection: 'row'}}>
        <View style={{flex: 1, borderWidth: 1, alignItems: 'center'}}>
          <Text h1>{completedTasksCount}</Text>
          <Text style={{textAlign: "center", fontWeight: "700", fontSize: 16}}>Завершено завдань</Text>
        </View>
        <View style={{flex: 1, borderWidth: 1, alignItems: 'center'}}>
          <Text h1>{activeTasksCount}</Text>
          <Text style={{textAlign: "center", fontWeight: "700", fontSize: 16}}>Активних завдань</Text>
        </View>
      </View>
      <TaskStatistics />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    width: "100%",
    // fontSize: 50,
  },
});
