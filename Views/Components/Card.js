import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Text, Card, Button } from "@rneui/base";
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

const MyProgress = () => (
    <ProgressBar
    progress={Math.random()}
    color={"yellow"}
    style={styles.progressBar} 
    />
  );

export default function MyCard({ item, navigation }) {
  const colours = ["#3CBC3C", "red", "#D77D00"]
  return (
        <View style={styles.container}>
        <Pressable
              key={item.id}
              onLongPress={() => {
                navigation.navigate("Goal Subtasks", {
                  goalName: item.name,
                  goalId: item.id,
                });
              }}>
          <Card containerStyle={styles.card}>
            <View style={[styles.containerTitle, {backgroundColor: item.id[0] == "0" ? colours[1] : colours[2]}]}>
              <View style={styles.titleLeft}>
                <Text h4 style={styles.textName} >{item.name}</Text>
              </View>
              <View style={styles.titleRight}>
                <MyProgress/>
              </View>
            </View>
            <Card.Divider />
            <View style={styles.containerUnder}>
              <View style={styles.description}>
                <Text>TRY THE LONGPRESS</Text>
                <Text style={styles.name}>{item.description}</Text>
              </View>
              <View style={styles.underRight}>
                <View style={styles.date}>
                  <Feather name="clock" size={32} color="black" styles={styles.dateIcon} />
                  <Text style={styles.dateText}>26.09.2023</Text>
                </View>
                <Text style={{fontWeight: "bold", padding: 10}}>Днів залишилося: 32</Text>
            </View>
              </View>
          </Card>
        </Pressable>
      </View>
    );
};

const styles = StyleSheet.create({
    container:{
      paddingBottom: "35%",
      paddingHorizontal: 10,
    },
    card: {
      borderRadius: 20,
      padding: 0,
      overflow: 'hidden',
    },
    containerTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      borderWidth: 2,
      borderBottomWidth: 0,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: "green",

      paddingVertical: 10,
    },
    containerUnder: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",

      marginVertical: 10,

      paddingBottom: 10,
    },
    underRight: {
    },
    progressBar: {
      borderWidth: 2,
      borderRadius: 10,
      borderColor: "black",
      height: 25,
      width: '100%',
    },
    name: {
      fontSize: 16,
      marginVertical: 5,
    },
    textName: {
      color: "#fff",
    },
    titleLeft: {
      flex: 1,
      marginHorizontal: 10,
      alignItems: "center",
    },
    titleRight: {
      flex: 1,
      marginHorizontal: 10,
    },
    description: {
      flex: 1,
      alignItems: "flex-start",
      marginHorizontal: 10,
      marginLeft: 20,
    },
    date: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      marginRight: 10,
    },
    dateText: {
      fontWeight: "bold",
      marginHorizontal: 10,
    },
    dateIcon: {
      marginHorizontal: 10,
    }
});