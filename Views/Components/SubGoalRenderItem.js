import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, Text, Button } from '@rneui/base'
import { MaterialIcons } from '@expo/vector-icons';
import { format, isToday, isTomorrow, isYesterday, differenceInDays } from "date-fns";

export default function SubGoalRenderItem({ goal, item, deleteSubtask, onSubtaskCompletionChange }) {
    const [checked, setChecked] = useState(item.checked);

    const leftContent = (reset) => {
        return (
          <Button
            title="Delete"
            onPress={() => {
              deleteSubtask(item.id);
              reset();
            }}
            icon={{ name: "delete", color: "white" }}
            buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
          />
        );
      };

    const toggleSubtaskCompletion = () => {
      setChecked(!checked);
      onSubtaskCompletionChange(goal.id, item.id);
    };

    function pluralizeDays(days) {
      if (days === 1) return 'день';
      if (days >= 2 && days <= 4) return 'дні';
      return 'днів';
    }
    
    function formatReminderDate(reminderDate) {
      const date = new Date(reminderDate);
      const now = new Date();
      
      let formattedDate = [];
      
      if (isToday(date)) {
        formattedDate = ['Сьогодні', format(date, 'HH:mm')];
      } else if (isTomorrow(date)) {
        formattedDate = ['Завтра', format(date, 'HH:mm')];
      } else if (isYesterday(date)) {
        formattedDate = ['Вчора', format(date, 'HH:mm')];
      } else {
        const daysDiff = differenceInDays(date, now);
      
        if (daysDiff < 0) {
          formattedDate = ['Прострочено', format(date, 'dd.MM')];
        } else {
          const daysText = pluralizeDays(daysDiff);
          formattedDate = [format(date, 'dd.MM'), `Ще ${daysDiff} ${daysText}`];
        }
      }
      
      return formattedDate;
    }

  return (
    <ListItem.Swipeable
      bottomDivider
      leftContent={leftContent}
      containerStyle={styles.container}
    //   onPress={() => setChecked(!checked)}
      >
        <ListItem.Content style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <MaterialIcons name="subject" size={24} color="black" style={{paddingLeft: 5}} />
            <ListItem.Title style={{textAlign: "center", fontWeight: "700", flex: 1, paddingLeft: 10}}>{item.name}</ListItem.Title>
            <Text style={{paddingRight: 10, fontWeight: "700"}}>{formatReminderDate(item.reminderDate)[0]}</Text>
            <Text style={{paddingRight: 0, fontWeight: "700"}}>{formatReminderDate(item.reminderDate)[1]}</Text>
        </ListItem.Content>
        <ListItem.CheckBox
          checked={checked}
          onPress={toggleSubtaskCompletion}
          uncheckedIcon={<MaterialIcons name="radio-button-unchecked" size={28} color="black" />}
          checkedIcon={<MaterialIcons name="radio-button-checked" size={28} color="black" />}
          />
    </ListItem.Swipeable>
  )
}

const styles = StyleSheet.create({})