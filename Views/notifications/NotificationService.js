// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';
// import { Platform } from 'react-native';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// const registerForPushNotificationsAsync = async () => {
//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 50, 50, 50],
//       lightColor: '#FF231F7C',
//     });
//   }

//   let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//   if (status !== 'granted') {
//     status = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//   }
//   return status === 'granted';
// };

// const scheduleNotification = async (taskId, taskName, reminderDate) => {
//   try {
//     const notificationDate = new Date(reminderDate);
//     const now = new Date();

//     if (notificationDate > now) {
//       await Notifications.scheduleNotificationAsync({
//         content: {
//           title: 'Нагадування',
//           body: `Час виконати завдання: ${taskName}`,
//         },
//         trigger: {
//           date: notificationDate,
//         },
//       });
//       console.log(`Сповіщення заплановано на ${notificationDate}`);
//     } else {
//       console.log('Дата для сповіщення у минулому');
//     }
//   } catch (error) {
//     console.error('Error scheduling notification:', error);
//   }
// };

// export {
//   registerForPushNotificationsAsync,
//   scheduleNotification
// };

import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import { Platform } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const registerForPushNotificationsAsync = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 50, 50, 50],
      lightColor: '#FF231F7C',
    });
  }

  let { status } = await Location.requestForegroundPermissionsAsync();
  // let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    // status = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    console.log('Permission to access location was denied');
    return;
  }
  return status === 'granted';
};

const scheduleNotification = async (taskId, taskName, reminderDate) => {
  try {
    const notificationDate = new Date(reminderDate);
    const now = new Date();

    if (notificationDate > now) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Нагадування',
          body: `Час виконати завдання: ${taskName}`,
        },
        trigger: {
          date: notificationDate,
        },
      });

      const existingTasks = await AsyncStorage.getItem("tasks");
      let tasksArray = existingTasks ? JSON.parse(existingTasks) : [];

      tasksArray = tasksArray.map((task) => {
        if (task.id === taskId) {
          task.notificationScheduled = true;
        }
        return task;
      });

      await AsyncStorage.setItem("tasks", JSON.stringify(tasksArray));
      console.log(`Сповіщення заплановано на ${notificationDate}`);
    } else {
      console.log('Дата для сповіщення у минулому');
    }
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};

const cancelNotification = async (taskId) => {
  try {
    const existingTasks = await AsyncStorage.getItem("tasks");
    let tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
    
    const task = tasksArray.find(task => task.id === taskId);
    
    if (!task || !task.notificationIdentifier) {
      console.log(`Сповіщення для задачі з ID ${taskId} не було заплановано`);
      return;
    }
    
    await Notifications.cancelScheduledNotificationAsync(task.notificationIdentifier);

    task.notificationScheduled = false;

    await AsyncStorage.setItem("tasks", JSON.stringify(tasksArray));
    
    console.log(`Сповіщення для задачі з ID ${taskId} скасовано`);
  } catch (error) {
    console.error('Error cancelling notification:', error);
  }
};

export {
  registerForPushNotificationsAsync,
  scheduleNotification,
  cancelNotification
};
