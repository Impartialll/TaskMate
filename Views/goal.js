import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import GoalFAB from "./fab/GoalFAB";
import MyFAB from "./fab/HomeFAB";
import MyCard from "./Components/Card";

import goals from "../services/goals";
  
export default function Goal() {
  const [data, setData] = useState([]);
  const [isModalClosed, setIsModalClosed] = useState(false);
  const [date, setDate] = useState(new Date());

  const fetchGoals = async () => {
    try {
        const response = await goals.getAll();
        setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  useEffect(() => {
    if (isModalClosed) {
      fetchGoals();
      setIsModalClosed(false);
    }
  }, [isModalClosed]);

  const handleModalClose = () => {
    setIsModalClosed(true);
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <MyCard data={data} navigation={navigation} />
    </ScrollView>
    <MyFAB onClose={handleModalClose} updateTasks={fetchGoals} date={date} setDate={setDate} title_state={"Нова ціль"} placeholder_state={"Назва цілі"} />
    </SafeAreaView>
  )
  ;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  });