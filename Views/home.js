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
import MyFAB from "../components/MyFAB";

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

export default function Home({ tasks, cats, setCat }) {
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
        onPress={() => setCat("All")}
      />
    );
  };

  return (
    <View>
      <Header
        leftComponent={LeftComponent}
        centerComponent={<HeaderComponent setCat={setCat} categories={cats} />}
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
        data={tasks}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Separator />}
        contentContainerStyle={{ paddingBottom: 0 }}
      />
      <MyFAB />
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
  buttonContainer: {
    marginHorizontal: 8,
    borderRadius: 17,
    // height: 32,
  },
  buttonStyle: {
    backgroundColor: "#ffb3b3",
    // borderWidth: 1.5,
    // borderColor: "white",
    // borderRadius: 0,
  },
  titleStyle: {
    // paddingBottom: 5,
    color: "black",
    fontWeight: "800",
    fontSize: 13,
  },
});
