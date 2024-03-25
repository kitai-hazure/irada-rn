import notifee, {
  AndroidChannel,
  AuthorizationStatus,
  EventType,
  Notification,
  Trigger,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONSTANTS} from '../config';
import {ToastHelper} from './ToastHelper';

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
    const {authorizationStatus} = await notifee.requestPermission();
    if (authorizationStatus === AuthorizationStatus.AUTHORIZED) {
      await notifee.createChannel(channel);
      await notifee.displayNotification(notification);
      return;
    } else {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: 'Please enable notification permission',
      });
    }
  },

  async createTriggerNotification({
    notification,
    trigger,
  }: CreateNotificationOptions) {
    const {authorizationStatus} = await notifee.requestPermission();
    if (authorizationStatus === AuthorizationStatus.AUTHORIZED) {
      await notifee.createChannel(NotifeeHelper.CHANNEL);
      await notifee.createTriggerNotification(notification, trigger);
      return;
    } else {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: 'Please enable notification permission',
      });
    }
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
