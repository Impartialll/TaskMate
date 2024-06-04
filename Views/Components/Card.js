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

export default function MyCard({ data, navigation }) {
  return (
    <View style={styles.container}>
    {data.map((goal) => {
      return (
        <Pressable
              key={goal.id}
              onLongPress={() => {
                navigation.navigate("Goal Subtasks", {
                  goalName: goal.name,
                  goalId: goal.id,
                });
              }}>
          <Card containerStyle={styles.card}>
            <View style={styles.containerTitle}>
              <View style={styles.titleLeft}>
                <Text h4 style={styles.textName} >{goal.name}</Text>
              </View>
              <View style={styles.titleRight}>
                <MyProgress/>
              </View>
            </View>
            <Card.Divider />
            <View style={styles.containerUnder}>
              <View style={styles.description}>
                <Text>TRY THE LONGPRESS</Text>
                <Text style={styles.name}>{goal.description}</Text>
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
        );
      })}
      </View>
  )
};

const styles = StyleSheet.create({
    container:{
      paddingBottom: "35%",
      paddingHorizontal: 10, // Added padding for the entire container to manage spacing
    },
    card: {
      borderRadius: 20,
      padding: 0, // Remove padding inside the card to ensure full-width top part
      overflow: 'hidden', // Ensure children are clipped to the card's rounded corners
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
      borderRadius: 15,
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
      // alignItems: "flex-start",
    },
    description: {
      flex: 1,
      alignItems: "flex-start",
      marginHorizontal: 10,
      marginLeft: 20,

      // borderWidth: 2,
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