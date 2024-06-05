import React, {useState, useEffect} from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { Header, Button, Tooltip } from "@rneui/base";

import { useNavigation } from "@react-navigation/native";

import HeaderComponent from "./Components/Header";
import RenderItem from "./Components/RenderItem";
import HomeFAB from "./fab/HomeFAB";
import MyMenu from "./Components/Menu";

import tasks from "../services/tasks";
import categories from "../services/categories";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Separator = () => <View style={styles.itemSeparator} />;

export default function Home() {

  const [cats, setCats] = useState([]);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalClosed, setIsModalClosed] = useState(false);
  const [date, setDate] = useState(new Date());

  const fetchCats = async () => {
    try {
      const response = await categories.getAll();
      setCats(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // const fetchTasks = async () => {
  //   try {
  //     let response;
  //     if (selectedCategory) {
  //       if (selectedCategory === "All") {
  //         setSelectedCategory(null);
  //         return;
  //       }
  //       response = await tasks.getByCategory(selectedCategory);
  //       setData(response.data);
  //     } else {
  //       response = await tasks.getAll();
  //       setData(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const fetchTasks = async () => {
    try {
      const localData = await AsyncStorage.getItem('tasks');
      if (localData !== null) {
        setData(JSON.parse(localData));
      } else {
        console.log('No tasks found in local storage.');
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]); // При помилці встановіть порожній масив
    }
  };
  
  

  useEffect(() => {
    fetchCats();
    fetchTasks();
  }, [selectedCategory]);

  useEffect(() => {
    if (isModalClosed) {
      fetchTasks();
      setIsModalClosed(false);
    }
  }, [isModalClosed]);

  useEffect(() => {
    fetchCats();
    fetchTasks();
  }, [data, cats]);

  const handleModalClose = () => {
    setIsModalClosed(true);
  };
  
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <RenderItem item={item} fetchTasks={fetchTasks} navigation={navigation} />
  );

  const RigthComponent = () => {
    return (
        <MyMenu />
    );
  };

  const LeftComponent = () => {
    return (
      <Button
        title={"All"}
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.titleStyle}
        onPress={() => setSelectedCategory("All")}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={LeftComponent}
        centerComponent={<HeaderComponent setCat={setSelectedCategory} categories={cats} />}
        rightComponent={RigthComponent}
        leftContainerStyle={{
          justifyContent: "center",
        }}
        centerContainerStyle={{
          justifyContent: "center",
        }}
        rightContainerStyle={{
          justifyContent: "center",
        }}
        containerStyle={{
          backgroundColor: "#fff",
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Separator />}
        contentContainerStyle={styles.listStyle}
      />
      <HomeFAB onClose={handleModalClose} date={date} setDate={setDate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listStyle: {
    paddingBottom: "35%",
  },
  itemSeparator: {
    marginVertical: 10,
  },
  textStyle: {
    width: "100%",
    fontSize: 50,
  },
  buttonContainer: {
    marginHorizontal: 8,
    borderRadius: 17,
  },
  buttonStyle: {
    backgroundColor: "#ffb3b3",
  },
  titleStyle: {
    color: "black",
    fontWeight: "800",
    fontSize: 13,
  },
});
