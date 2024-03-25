import notifee, {
  AndroidChannel,
  EventType,
  Notification,
  Trigger,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONSTANTS} from '../config';

type CreateNotificationOptions = {
  trigger: Trigger;
  notification: Notification;
};

type DisplayNotificationOptions = {
  notification: Notification;
  channel: AndroidChannel;
};

export const NotifeeHelper = {
  async displayNotification({
    notification,
    channel,
  }: DisplayNotificationOptions) {
    await notifee.requestPermission();
    await notifee.createChannel(channel);
    await notifee.displayNotification(notification);
  },

  async createTriggerNotification({
    notification,
    trigger,
  }: CreateNotificationOptions) {
    await notifee.requestPermission();
    await notifee.createChannel(NotifeeHelper.CHANNEL);
    await notifee.createTriggerNotification(notification, trigger);
  },

  async cancelTriggerNotification(id: string) {
    await notifee.cancelTriggerNotification(id);
  },

  async cancelAllNotifications() {
    await notifee.cancelAllNotifications();
  },

  async setupEventHandlers() {
    notifee.onBackgroundEvent(async ({type, detail}) => {
      const {notification} = detail;
      if (type === EventType.PRESS && notification?.id) {
        await NotifeeHelper.addCurrentTransaction(notification.id);
      }
    });
  },

  async addCurrentTransaction(id: string) {
    const data = await AsyncStorage.getItem(
      CONSTANTS.STORAGE.SCHEDULED_TRANSACTION,
    );
    if (!data) {
      await AsyncStorage.setItem(
        CONSTANTS.STORAGE.SCHEDULED_TRANSACTION,
        JSON.stringify([id]),
      );
    } else {
      const parsedData: string[] = JSON.parse(data);
      const uniqueArray = Array.from(new Set([...parsedData, id]));
      await AsyncStorage.setItem(
        CONSTANTS.STORAGE.SCHEDULED_TRANSACTION,
        JSON.stringify(uniqueArray),
      );
    }
  },

  CHANNEL: {
    id: 'default',
    name: 'Default',
  },
};
