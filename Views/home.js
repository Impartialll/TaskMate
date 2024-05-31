import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { Header, Button, Tooltip } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";

import HeaderComponent from "./Components/HeaderComponent";
import RenderItem from "./Components/RenderItem";
import MyFAB from "./fab/MyFAB";

import Entypo from "@expo/vector-icons/Entypo";

keyExtractor = (item, index) => index.toString();
const Separator = () => <View style={styles.itemSeparator} />;

export default function Home({ data, cats, setCat, fetchData }) {
  const renderItem = ({ item }) => (
    <RenderItem item={item} fetchData={fetchData} navigation={navigation} />
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
        onPress={() => setCat("All")}
      />
    );
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        leftComponent={LeftComponent}
        centerComponent={<HeaderComponent setCat={setCat} categories={cats} />}
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
      <MyFAB fetchData={fetchData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: "90%",
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
