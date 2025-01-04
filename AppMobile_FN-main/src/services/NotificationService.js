import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { navigate } from './NavigationRef'; // You'll need to implement navigation ref

class NotificationService {
  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    return authStatus;
  }

  async createCallChannel() {
    return await notifee.createChannel({
      id: 'incoming-calls',
      name: 'Incoming Calls',
      importance: AndroidImportance.HIGH,
      sound: 'ringtone',
      vibration: true,
    });
  }

  async displayCallNotification(callerInfo) {
    const channelId = await this.createCallChannel();

    await notifee.displayNotification({
      title: 'Incoming Call',
      body: `${callerInfo.fullName} is calling...`,
      android: {
        channelId,
        pressAction: {
          id: 'answer',
          launchActivity: 'default',
        },
        actions: [
          {
            title: 'Answer',
            pressAction: {
              id: 'answer',
            },
          },
          {
            title: 'Decline',
            pressAction: {
              id: 'decline',
            },
          },
        ],
      },
    });
  }
}

export default new NotificationService();
