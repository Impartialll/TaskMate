import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from '@rneui/base';
import { AntDesign } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import { differenceInDays, differenceInMinutes, isToday, isPast, isTomorrow, isYesterday, parseISO, format } from 'date-fns';

export default function SubGoalHeader({ item, name, description, id, date, navigation }) {

  function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    return format(date, 'dd.MM.yyyy');
  }

  const Left = () => (
    <Button
    type='clear'
      icon={<AntDesign name="arrowleft" size={24} color="black" />}
      onPress={() => navigation.goBack()}
      />
  );

  const MyProgress = () => (
    <ProgressBar
      progress={Math.random()}
      color={"yellow"}
      style={styles.progressBar} 
      />
  );

  return (
    <View style={styles.container}>
      <View style={{alignSelf: "flex-start", paddingHorizontal: 5, paddingVertical: 10}} >
        <Left/>
      </View>
      <View style={{justifyContent: "center", flex: 1, paddingRight: 30, paddingVertical: 20}}>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center",  paddingBottom: 5}} >
          <Text h3 style={{textAlign: "center", paddingRight: 20, maxWidth: 190}} >{name}</Text>
          <Text style={{fontWeight: "700", fontSize: 16, textAlign: "center", paddingTop: 7}}>{formatDateToDDMMYYYY(item.reminderDate)}</Text>
        </View>
        <MyProgress/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
        height: "auto",
        backgroundColor: "#4285F4"
    },
    progressBar: {
      borderWidth: 2,
      borderRadius: 10,
      borderColor: "black",
      height: 25,
      width: '100%',
    },
})