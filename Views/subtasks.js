import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Header, Button, Text, FAB } from "@rneui/base";
import { format, isToday, isTomorrow, isYesterday, differenceInDays } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";
import SubMenu from "./Components/SubMenu";
import NewSubtask from "./Components/NewSubtask";
import SubRenderItem from "./Components/SubRenderItem";

export default function Subtasks() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, name, description, category, date, categories, subtasks } = route.params;

  const [subtaskList, setSubtaskList] = useState(subtasks);
  const [visible, setVisible] = useState(false);

  const addSubtask = async (newSubtask) => {
    const newSubtaskData = {
      id: uuid.v4(),
      name: newSubtask.trim(),
    };

    const updatedSubtasks = [...subtaskList, newSubtaskData];
    setSubtaskList(updatedSubtasks);

    const existingTasks = await AsyncStorage.getItem('tasks');
    const tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
    const taskIndex = tasksArray.findIndex(t => t.id === id);
    tasksArray[taskIndex].subtasks = updatedSubtasks;
    await AsyncStorage.setItem('tasks', JSON.stringify(tasksArray));
  };

  const deleteSubtask = async (subtaskId) => {
    const updatedSubtasks = subtaskList.filter(subtask => subtask.id !== subtaskId);
    setSubtaskList(updatedSubtasks);

    const existingTasks = await AsyncStorage.getItem('tasks');
    const tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
    const taskIndex = tasksArray.findIndex(t => t.id === id);
    tasksArray[taskIndex].subtasks = updatedSubtasks;
    await AsyncStorage.setItem('tasks', JSON.stringify(tasksArray));
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
      headerShown: false,
    });
  }, [navigation, name]);

  function pluralizeDays(days) {
    if (days === 1) return 'день';
    if (days >= 2 && days <= 4) return 'дні';
    return 'днів';
  }
  
  function formatReminderDate(reminderDate) {
    const date = new Date(reminderDate);
    const now = new Date();
    
    let formattedDate = [];
    
    if (isToday(date)) {
      formattedDate = ['Сьогодні', format(date, 'HH:mm')];
    } else if (isTomorrow(date)) {
      formattedDate = ['Завтра', format(date, 'HH:mm')];
    } else if (isYesterday(date)) {
      formattedDate = ['Вчора', format(date, 'HH:mm')];
    } else {
      const daysDiff = differenceInDays(date, now);
    
      if (daysDiff < 0) {
        formattedDate = ['Прострочено', format(date, 'dd.MM')];
      } else {
        const daysText = pluralizeDays(daysDiff);
        formattedDate = [format(date, 'dd.MM'), `Ще ${daysDiff} ${daysText}`];
      }
    }
    
    return formattedDate;
  }

  const left = () => (
    <Button
      icon={<AntDesign name="arrowleft" size={24} color="black" />}
      onPress={() => navigation.goBack()}
      />
  );

  const center = () => (
    <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}} >
      <View style={styles.containerTaskNameStyle}>
        <Text h4 style={styles.taskNameStyle}>
          {name}
        </Text>
      </View>
      <View style={{paddingLeft: 40}} >
        <Text style={{textAlign: "center", fontWeight: "700"}} >{formatReminderDate(date)[0]}</Text>
        <Text style={{textAlign: "center", fontWeight: "700"}} >{formatReminderDate(date)[1]}</Text>
      </View>
    </View>
  );

  const right = () => (
    <SubMenu categories={categories} />
  );

  const renderItem = ({ item }) => (
    <SubRenderItem item={item} deleteSubtask={deleteSubtask} />
  );

  return (
    <View style={{ flex: 1 }}>
      <Header
        leftComponent={left}
        centerComponent={center}
        rightComponent={right}
        leftContainerStyle={[styles.headerContainerStyle, {}]}
        centerContainerStyle={[styles.headerContainerStyle, {alignContent: "center"}]}
        rightContainerStyle={[styles.headerContainerStyle, {}]}
        />
      <FlatList
        data={subtaskList}
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
      <NewSubtask
        visible={visible}
        onClose={toggleOverlay}
        onCreate={addSubtask}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainerStyle: {
    justifyContent: "center",
  },
  containerTaskNameStyle: {
    maxWidth: 150,
    borderColor: "black",
    borderWidth: 4,
    borderRadius: 15,
    borderColor: "#fff",
    backgroundColor: "#AD1457",
    alignItems: "center"
  },
  taskNameStyle: {
    paddingHorizontal: 15,
    padding: 7,
    color: "#fff",
  },
  fabStyle: {
    paddingRight: 10,
    paddingBottom: 20,
  },
});
