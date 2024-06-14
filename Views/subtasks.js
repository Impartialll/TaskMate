import React, { useLayoutEffect, useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Header, Button, Text, Input, FAB } from "@rneui/base";

import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import SubMenu from "./Components/SubMenu";

export default function Subtasks() {
  const route = useRoute();
  const navigation = useNavigation();
  const { taskId, taskName, categories } = route.params;

  const [inputTaskName, setInputTaskName] = useState("");
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
    onClose();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: taskName,
      headerShown: false,
    });
  }, [navigation, taskName]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        // tasks.update(taskId, inputTaskName);
        // fetchData();
      };
    }, [])
  );

  const left = () => {
    return (
      <Button
      icon={<AntDesign name="arrowleft" size={24} color="black" />}
      onPress={() => navigation.goBack()}
      />
    );
  };

  const center = () => {
    return (
      <View style={styles.containerTaskNameStyle}>
        <Text h4 style={styles.taskNameStyle}>
          {taskName}
        </Text>
      </View>
    );
  };

const right = () => {
  return (
    <View style={{flexDirection: "row"}} >
      <View style={{marginRight: 10}} >
        {/* <Button
          icon={<MaterialIcons name="category" size={24} color="black" />}
          containerStyle={{ borderRadius: 30 }}
          /> */}
          <SubMenu categories={categories} />
      </View>
      <Button
        icon={<FontAwesome6 name="check-double" size={24} color="black" />}
        // buttonStyle={{}}
        containerStyle={{ borderRadius: 30 }}
        onPress={() => console.log(categories)}
        />
    </View>
  );
};

  return (
    <View style={{ flex: 1 }}>
      <Header
        leftComponent={left}
        centerComponent={center}
        rightComponent={right}
        style={{borderTopWidth: 1, borderBottomWidth: 1}}
        leftContainerStyle={styles.headerContainerStyle}
        centerContainerStyle={styles.headerContainerStyle}
        rightContainerStyle={[styles.headerContainerStyle, {paddingRight: 5}]}
        />
      <FAB
        placement="right"
        style={styles.fabStyle}
        onPress={toggleOverlay}
        icon={() => {
          return <AntDesign name="plus" size={24} color="#fff" />;
        }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainerStyle: {
    justifyContent: "center",
  },
  containerTaskNameStyle: {
    borderColor: "black",
    borderWidth: 4,
    borderRadius: 25,
    borderColor: "#fff",
    backgroundColor: "#AD1457",
  },
  taskNameStyle: {
    paddingHorizontal: 10,
    padding: 7,
    color: "#fff",
  },
  fabStyle: {
    paddingRight: 10,
    paddingBottom: 20,
  },
});
