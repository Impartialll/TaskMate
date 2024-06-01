import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";

import { Text, Card, Button, Icon } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import GoalFAB from "./fab/GoalFAB";

import goals from "../services/goals"
  
export default function Goal() {
  const [data, setData] = useState([]);
  const [isModalClosed, setIsModalClosed] = useState(false);

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
      setIsModalClosed(false); // Reset the flag
    }
  }, [isModalClosed]);

  const handleModalClose = () => {
    setIsModalClosed(true);
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.subContainer}>
      {data.map((goal) => {
            return (
              <Card key={goal.id}>
                <Card.Title>{goal.name}</Card.Title>
                <Card.Divider />
                <View style={styles.user}>
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <Text style={styles.name}>{goal.description}</Text>
                </View>
              </Card>
            );
          })}
      </View>
    </ScrollView>
    <GoalFAB onClose={handleModalClose} />
    </SafeAreaView>
  )
  ;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer:{
    paddingBottom: "35%",
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