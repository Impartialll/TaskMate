import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, FlatList, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "@rneui/base";

import MyFAB from "./fab/FAB";
import MyCard from "./Components/Card";

export default function Goal() {
  const [data, setData] = useState([]);
  const [isModalClosed, setIsModalClosed] = useState(false);
  const [date, setDate] = useState(new Date());

  // const fetchGoals = async () => {
  //   try {
  //       const response = await goals.getAll();
  //       setData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const fetchGoals = async () => {
    try {
      const localData = await AsyncStorage.getItem('goals');
      if (localData !== null) {
        setData(JSON.parse(localData));
      } else {
        console.log('No goals found in local storage.');
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching goals:", error);
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

  const EmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text h4 style={styles.emptyText}>
          Цілей поки немає. Створіть нову ціль.
        </Text>
        <Image
          source={require("../assets/rounded-arrow.png")}
          style={styles.emptyImage}
        />
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <MyCard item={item} navigation={navigation} />
  );

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      ListEmptyComponent={EmptyComponent}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      contentContainerStyle={styles.listStyle}
      />
    <MyFAB
      onClose={handleModalClose}
      updateData={fetchGoals}
      date={date} setDate={setDate}
      title_state={"Нова ціль"}
      placeholder_state={"Назва цілі"}
      state="goals"
      />
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