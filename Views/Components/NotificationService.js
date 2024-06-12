import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';

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

  let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    status = await Permissions.askAsync(Permissions.NOTIFICATIONS);
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
      console.log(`Сповіщення заплановано на ${notificationDate}`);
    } else {
      console.log('Дата для сповіщення у минулому');
    }
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};

export {
  registerForPushNotificationsAsync,
  scheduleNotification
};
