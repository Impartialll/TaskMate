import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Text, Card, Button } from "@rneui/base";
import { ProgressBar } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { differenceInDays, differenceInMinutes, isToday, isPast, isTomorrow, isYesterday, parseISO, format } from 'date-fns';

export default function MyCard({ item, navigation }) {

  function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    return format(date, 'dd.MM.yyyy');
  }
  
  const MyProgress = () => (
      <ProgressBar
      progress={Math.random()}
      color={"yellow"}
      style={styles.progressBar} 
      />
    );

    function getDaysEnding(days) {
      if (days === 1) {
        return 'день';
      } else if (days >= 2 && days <= 4) {
        return 'дні';
      } else {
        return 'днів';
      }
    }
    
    function getDateStatus(reminderDate) {
      const date = parseISO(reminderDate);
      const now = new Date();
    
      const daysDifference = differenceInDays(date, now);
      const minutesDifference = differenceInMinutes(date, now);
    
      if (isToday(date)) {
        if (minutesDifference > 0) {
          return 'Прострочено сьогодні';
        } else {
          return 'Закінчується сьогодні';
        }
      } else if (isYesterday(date)) {
        return 'Прострочено вчора';
      } else if (isPast(date)) {
        const daysAgo = -daysDifference;
        const daysEnding = getDaysEnding(daysAgo);
        return `Прострочено ${daysAgo} ${daysEnding} тому`;
      } else if (isTomorrow(date)) {
        return 'Залишився один день';
      } else {
        const daysEnding = getDaysEnding(daysDifference);
        return `Днів залишилося: ${daysDifference} ${daysEnding}`;
      }
    }

  function getTaskStatus(reminderDate) {
    const colours = ["#3CBC3C", "#D77D00", "red"]
    const date = parseISO(reminderDate);
    const now = new Date();
  
    const daysDifference = differenceInDays(date, now);
  
    if (isPast(date)) {
      return colours[2];
    } else if (daysDifference <= 7) {
      return colours[1];
    } else {
      return colours[0];
    }
  }

  return (
        <Pressable
              key={item.id}
              onLongPress={() => {
                navigation.navigate("Goal Subtasks", {
                  goalName: item.name,
                  goalId: item.id,
                });
              }}>
          <Card containerStyle={styles.card}>
            <View style={[styles.containerTitle, {backgroundColor: getTaskStatus(item.reminderDate)}]}>
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
                <Text style={styles.name}>{item.description}</Text>
              </View>
              <View style={styles.underRight}>
                <View style={styles.date}>
                  <Feather name="clock" size={32} color="black" styles={styles.dateIcon} />
                  <Text style={styles.dateText}>{formatDateToDDMMYYYY(item.reminderDate)}</Text>
                </View>
                <Text style={{fontWeight: "bold", padding: 10}}>{getDateStatus(item.reminderDate)}</Text>
            </View>
              </View>
          </Card>
        </Pressable>
    );
};

const styles = StyleSheet.create({
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