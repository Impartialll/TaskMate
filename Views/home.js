import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Image } from "react-native";
import { Header, Button, Text } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isToday, isYesterday, parseISO } from "date-fns";
import uuid from 'react-native-uuid';

import HeaderComponent from "./Components/Header";
import RenderItem from "./Components/RenderItem";
import HomeFAB from "./fab/FAB";
import MyMenu from "./Components/Menu";
import FlashMessage from "react-native-flash-message";

export default function Home() {
  const [cats, setCats] = useState([]);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFABModalClosed, setIsFABModalClosed] = useState(false);
  const [date, setDate] = useState(new Date());

  const [menuModalVisible, setMenuModalVisible] = useState(false);

  const fetchCats = async () => {
    try {
      const localData = await AsyncStorage.getItem('categories');
      if (localData !== null) {
        setCats(JSON.parse(localData));
      } else {
        console.log('No categories found in local storage.');
        setCats([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const addCategory = async (newCategory) => {
    try {
      const newData = {
        id: uuid.v4(),
        name: newCategory,
      };
      const existingCategories = await AsyncStorage.getItem('categories');
      const categoriesArray = existingCategories ? JSON.parse(existingCategories) : [];
      categoriesArray.push(newData);
      await AsyncStorage.setItem('categories', JSON.stringify(categoriesArray));
      setCats(categoriesArray);
    } catch (error) {
      console.error("Error adding the category:", error);
    }
  };

  const openCategoryModal = () => {
    setMenuModalVisible(true);
  };

  const closeCategoryModal = () => {
    setMenuModalVisible(false);
    fetchCats();
  };

  // const fetchTasks = async () => {
  //   try {
  //     const localData = await AsyncStorage.getItem("tasks");
  //     if (localData !== null) {
  //       const tasks = JSON.parse(localData);
  //       if (selectedCategory && selectedCategory !== "All") {
  //         const filteredTasks = tasks.filter(task => task.category === selectedCategory);
  //         setData(filteredTasks);
  //       } else {
  //         setData(tasks);
  //       }
  //     } else {
  //       console.log("No tasks found in local storage.");
  //       setData([]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setData([]);
  //   }
  // };

  const fetchTasks = async () => {
    try {
      const localData = await AsyncStorage.getItem("tasks");
      if (localData !== null) {
        const tasks = JSON.parse(localData);
  
        const filteredTasks = tasks.filter(task => {
          if (task.completed) {
            const reminderDate = parseISO(task.reminderDate);
            return !isYesterday(reminderDate);
          }
          return true;
        });
  
        if (selectedCategory && selectedCategory !== "All") {
          const categoryFilteredTasks = filteredTasks.filter(task => task.category === selectedCategory);
          setData(categoryFilteredTasks);
        } else {
          setData(filteredTasks);
        }
      } else {
        console.log("No tasks found in local storage.");
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchCats();
    fetchTasks();
  }, [selectedCategory]);

  useEffect(() => {
    if (isFABModalClosed) {
      fetchTasks();
      setIsFABModalClosed(false);
    }
  }, [isFABModalClosed]);

  const handleModalClose = () => {
    setIsFABModalClosed(true);
  };

  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <RenderItem
      item={item}
      categories={cats}
      fetchTasks={fetchTasks}
      navigation={navigation}
      />
  );

  const RigthComponent = () => (
    <MyMenu
      createCategoryModal={openCategoryModal}
      isModalVisible={menuModalVisible}
      onCreate={addCategory}
      onClose={closeCategoryModal}
      categories={cats}
      setCats={setCats}
      fetchCats={fetchCats}
      setCat={setSelectedCategory}
      />
  );

  const LeftComponent = () => {
    return (
      <Button
        title={"Всі"}
        containerStyle={[styles.buttonContainer, {borderColor: selectedCategory === "All" ? "#fff" : "#AD1457"}]}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
        onPress={() => setSelectedCategory("All")}
        />
    );
  };

  const EmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text h4 style={styles.emptyText}>
          Завдань цієї категорії поки немає. Створіть нові завдання.
        </Text>
        <Image
          source={require("../assets/rounded-arrow.png")}
          style={styles.emptyImage}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={LeftComponent}
        centerComponent={
          <HeaderComponent
            setCat={setSelectedCategory}
            categories={cats}
            setCats={setCats}
            selectedCategory={selectedCategory}
            visible={menuModalVisible}
            openModal={openCategoryModal}
            onCreate={addCategory}
            onClose={closeCategoryModal}
            />
        }
        rightComponent={RigthComponent}
        leftContainerStyle={{justifyContent: "center"}}
        centerContainerStyle={{justifyContent: "center", alignItems: "flex-start", paddingLeft: 10}}
        rightContainerStyle={{justifyContent: "center"}}
        containerStyle={{backgroundColor: "#4285F4"}}
        />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={EmptyComponent}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        contentContainerStyle={styles.listStyle}
        />
      <HomeFAB
        onClose={handleModalClose}
        updateData={fetchTasks}
        date={date}
        setDate={setDate}
        title_state={"Нове завдання"}
        placeholder_state={"Назва завдання"}
        state="tasks"
        />
      <FlashMessage duration={3000} style={{borderRadius: 30, marginTop: 180, width: "80%"}} position={'top'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listStyle: {
    paddingBottom: "40%",
    marginTop: 10,
  },
  itemSeparator: {
    flex: 1,
    marginVertical: 10,
  },
  textStyle: {
    width: "100%",
    fontSize: 50,
  },
  buttonContainer: {
    marginHorizontal: 8,
    borderRadius: 17,
    borderWidth: 5,
  },
  buttonStyle: {
    backgroundColor: "#AD1457",
  },
  titleStyle: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "70%",
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: 250,
    height: 250,
    marginTop: 20,
    transform: [{ scaleY: -1 }],
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});
