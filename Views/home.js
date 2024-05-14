import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Modal } from "react-native";

import {
  ListItem,
  Avatar,
  Header,
  Button,
  Tooltip,
  Text,
} from "react-native-elements";

import Entypo from "@expo/vector-icons/Entypo";

import HeaderComponent from "./Components/HeaderComponent";
import tasks from "../services/tasks";
import categories from "../services/categories";

keyExtractor = (item, index) => index.toString();

const renderItem = ({ item }) => {
  return (
    <ListItem bottomDivider>
      <Avatar title={item.name[0]} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

const Separator = () => <View style={styles.itemSeparator} />;

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tasks.getAll();
        setData(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchData();
    fetchCats();
  }, []);

  const [cats, setCats] = useState([]);
  const fetchCats = async () => {
    try {
      const response = await categories.getAll();
      setCats(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

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

  return (
    <View>
      <Header
        centerComponent={<HeaderComponent cats={cats} />}
        rightComponent={RigthComponent}
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
        contentContainerStyle={{ paddingBottom: 0 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    width: "100%",
    fontSize: 50,
  },
});
