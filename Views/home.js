import React, {useState, useEffect} from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { Header, Button, Tooltip } from "@rneui/base";

import { useNavigation } from "@react-navigation/native";

import HeaderComponent from "./Components/HeaderComponent";
import RenderItem from "./Components/RenderItem";
import HomeFAB from "./fab/HomeFAB";

import Entypo from "@expo/vector-icons/Entypo";

import tasks from "../services/tasks";
import categories from "../services/categories";

keyExtractor = (item, index) => index.toString();
const Separator = () => <View style={styles.itemSeparator} />;

export default function Home() {

  const [cats, setCats] = useState([]);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalClosed, setIsModalClosed] = useState(false);

  const fetchCats = async () => {
    try {
      const response = await categories.getAll();
      setCats(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchTasks = async () => {
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
    fetchTasks();
  }, [selectedCategory]);

  useEffect(() => {
    if (isModalClosed) {
      fetchTasks();
      setIsModalClosed(false); // Reset the flag
    }
  }, [isModalClosed]);

  const handleModalClose = () => {
    setIsModalClosed(true);
  };

  const renderItem = ({ item }) => (
    <RenderItem item={item} fetchTasks={fetchTasks} navigation={navigation} />
  );

  const RigthComponent = () => {
    return (
      <Tooltip popover={<Button></Button>}>
        <Button
          icon={<Entypo name="dots-three-vertical" size={14} color="black" />}
          type="clear"
          buttonStyle={{}}
          containerStyle={{}}
          onPress={() => console.log(true)}
        />
      </Tooltip>
    );
  };

  const LeftComponent = () => {
    return (
      <Button
        title={"All"}
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.titleStyle}
        onPress={() => setCats("All")}
      />
    );
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        leftComponent={LeftComponent}
        centerComponent={<HeaderComponent setCats={setCats} categories={cats} />}
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
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Separator />}
        contentContainerStyle={styles.listStyle}
      />
      <HomeFAB onClose={handleModalClose } />
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
