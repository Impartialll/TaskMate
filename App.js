import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import Navigation from "./Views/Navigation";

import tasks from "./services/tasks";
import categories from "./services/categories";

export default function App() {
  const [cats, setCats] = useState([]);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCats = async () => {
    try {
      const response = await categories.getAll();
      setCats(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchData = async () => {
    try {
      if (selectedCategory) {
        if (selectedCategory === "All") {
          setSelectedCategory(null);
          return;
        }
        const response = await tasks.getByCategory(selectedCategory);
        setData(response.data);
      } else {
        const response = await tasks.getAll();
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCats();
    fetchData();
  }, [selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <Navigation
        tasks={data}
        cats={cats}
        setCat={setSelectedCategory}
        fetchData={fetchData}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
