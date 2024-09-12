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

2. Start the app with the test device connected to your machine

Android:
```bash
    npx expo run:android
```
iOS:
```bash
    npx expo run:ios
```

3. Allow the application to send notifications
4. Send a test notification (Android only):
   1. Get HWID by tapping the "Get HWID" button"
   2. Use curl to send a notification
   ```
   curl -X POST \
        https://api.pushwoosh.com/json/1.3/createMessage \
        -H 'Content-Type: application/json' \
        -d '{
        "request": {
          "application": "7714C-93EB7",
          "auth": "uYxkspQWrVvrBi80yFea5B7YMJkKNhFVd0Hg8r3FeBk6k4O8hLTAKS4O8Otbji0TkYmcjhVYWiYrV7VuXz2E",
          "notifications": [
            {
              "send_date": "now",
              "content": "Test notification",
              "devices": [
                "HWID_OF_YOUR_DEVICE"
              ]
            }
          ]
        }
      }'
   ```

   The applicaton is configured to work with Pushwoosh sample project "7714C-93EB7".
   ### To configure the app with your own Pushwoosh project:
   Modify the initialization parameters in [app/_layout.tsx](https://github.com/Ankononenko/pushwoosh-expo-sample/blob/develop/app/_layout.tsx#L85) with your Pushwoosh APP_ID and Firebase SENDER_ID.
   ```
   Pushwoosh.init({ pw_appid: "APP_ID", project_number: "SENDER_ID" });
   ```
   ![image](https://github.com/user-attachments/assets/7b10d018-d493-4099-b323-cd25a2e7380b)
   
   Replace the google-services.json file in the root of the sample project and rebuild the Android platform.

   The guide for SDK integration is available on [Pushwoosh website](https://docs.pushwoosh.com/platform-docs/pushwoosh-sdk/cross-platform-frameworks/expo/integrating-expo-plugin).
   
   If you have any questions you can contact us at help@pushwoosh.com 🤝
