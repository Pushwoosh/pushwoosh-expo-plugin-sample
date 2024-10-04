# Pushwoosh Expo Sample app 👋
<div align="left">
    <img src="assets/screencast.gif" alt="Pushwoosh Expo Sample app" width="300">
</div>

---
## 📖 Overview
This sample app demonstrates the integration of the Pushwoosh Expo plugin and tests notification delivery on iOS and Android platforms.<br>
It is designed to showcase the capabilities of Pushwoosh without the need for extensive setup.

## ✨ Features
- Register/unregister device to receive notifications
- Send test notifications using our sample project without the need to set up your project in control panel or Firebase console
- Enable/disable server communication with Pushwoosh
- Set custom user ID for a device
- Send events
- Set custom and default languages for a device
- Set tags
- Set emails for a user or a device
- Get HWID to clipboard
- Get push token to clipboard
- Get user ID to clipboard

## 🛠️ Get started
### Prerequisites:
- Project created in [Firebase console](https://console.firebase.google.com/)
- [Encryption key and key ID from Apple](https://docs.pushwoosh.com/platform-docs/first-steps/start-with-your-project/configure-project/ios-configuration/ios-token-based-configuration)
- Application in [Pushwoosh control panel](https://sso.pushwoosh.com/login) with Android and iOS platforms configured.
[Android Firebase configuration](https://docs.pushwoosh.com/platform-docs/first-steps/start-with-your-project/configure-project/configure-android-platform)
[iOS token-based configuration](https://docs.pushwoosh.com/platform-docs/first-steps/start-with-your-project/configure-project/ios-configuration/ios-token-based-configuration)
- Node.js and npm (or yarn)
- Expo CLI
- Expo Go app for mobile devices
- Android Studio
- Xcode

### Steps:
1. Install dependencies
   
```bash
   npm install
```
2. Connect your app to Pushwoosh and Firebase

Enter the app ID from Pushwoosh control panel and FCM sender ID:

[L85 pushwoosh-expo-sample/app/_layout.tsx](https://github.com/Ankononenko/pushwoosh-expo-sample/blob/develop/app/_layout.tsx#L85):
![image](https://github.com/user-attachments/assets/b1e085ab-3fc2-4125-8dd6-8d56f0b451c9)

Place the google-services.json in the root directory of the app:

![image](https://github.com/user-attachments/assets/f81d1995-6eea-48d5-9422-2e46e5844f9c)

3. Prebuild

```
npx expo prebuild
```

4. iOS platform only: ensure that the push notification capability is enabled in your project, and that "Remote Notifications" is selected under "Background Modes":
   
![image](https://github.com/user-attachments/assets/636a36e3-c7e9-4401-b58b-d4d3a4fc2bf9)

Sign the app:

![image](https://github.com/user-attachments/assets/f361bfd6-ad53-4736-bd86-8aabf0efbf15)

4. Start the app with the test device connected to your machine

Android:
```bash
    npx expo run:android
```
iOS:
```bash
    npx expo run:ios
```

5. Allow the application to send notifications
4. Send a test notification.
   
If you have any questions, feel free to contact us at help@pushwoosh.com or open an issue in this repository 🤝
