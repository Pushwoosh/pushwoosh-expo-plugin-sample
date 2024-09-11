import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image, TextInput, ScrollView, StyleSheet, Alert, DeviceEventEmitter, Switch } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Pushwoosh from 'pushwoosh-react-native-plugin';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as Clipboard from 'expo-clipboard';

interface ButtonWithTextInputProps {
  buttonText: string;
  onPress: (input1: string, input2?: string) => void;
  placeholder1: string;
  placeholder2?: string;
}

const ButtonWithTextInput: React.FC<ButtonWithTextInputProps> = ({
  buttonText,
  onPress,
  placeholder1,
  placeholder2
}) => {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  const handlePress = () => {
    onPress(inputValue1, inputValue2 ? inputValue2 : '');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, { flex: 2 }]}
        placeholder={placeholder1}
        onChangeText={setInputValue1}
        value={inputValue1}
      />
      {placeholder2 && (
        <TextInput
          style={[styles.input, { flex: 2 }]}
          placeholder={placeholder2}
          onChangeText={setInputValue2}
          value={inputValue2}
        />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
      SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  var pushwooshInitialized = false;
  const [isEnabledRegister, setIsEnabledRegister] = useState(true);
  const [isEnabledServer, setIsEnabledServer] = useState(true);

  const toggleSwitchNotification = () => {
    setIsEnabledRegister(previousState => !previousState);
  };

  useEffect(() => {
    async function initializePushwoosh() {
      await SplashScreen.preventAutoHideAsync();
  
      if (!pushwooshInitialized && isEnabledRegister) {
        try {
           /**
            * initialize Pushwoosh SDK.
            * Example params: {"pw_appid": "application ID", "project_number": "FCM Sender ID"}
            * 
            * PUSHWOOSH CODE
            *    |   |
            *   _|   |_
            *   \     /
            *    \   /
            *     \_/
            */
          Pushwoosh.init({ pw_appid: "7714C-93EB7", project_number: "843884467752" });
          pushwooshInitialized = true;
           /**
            * To register for push notifications, call the following method:
            * 
            * PUSHWOOSH CODE
            *    |   |
            *   _|   |_
            *   \     /
            *    \   /
            *     \_/
            */
          Pushwoosh.register(
            (token) => {
                console.warn("Registered for pushes: " + token);
                Pushwoosh.getPushToken(function(token) {
                    console.warn("Push token: " + token);
                });
            },
            (error) => {
                console.warn("Failed to register: " + error);
            }
        );
        } catch (error) {
          console.error("Failed to initialize Pushwoosh:", error);
        }
      }
      else if (!isEnabledRegister) {
        pushwooshInitialized = false;
        try {
        /**
         * To unregister for push notifications, call the following method:
         * 
         * PUSHWOOSH CODE
         *    |   |
         *   _|   |_
         *   \     /
         *    \   /
         *     \_/
         */
          Pushwoosh.unregister();
          Alert.alert("The device was unregistered");
        } catch (error) {
          console.error("Failed to unregister the device:", error);
        }
      }
      await SplashScreen.hideAsync();
    }
    initializePushwoosh();
  }, [fontsLoaded, pushwooshInitialized, isEnabledRegister]);  

  const toggleSwitchServerCommunication = () => {
      setIsEnabledServer(previousState => !previousState);
  };

  useEffect(() => {
    if (isEnabledServer) {
     /** 
      * Enable/disable all communication with Pushwoosh. Enabled by default.
      *
      *  PUSHWOOSH CODE
      *    |   |
      *   _|   |_
      *   \     /
      *    \   /
      *     \_/
      */
        try {
          Pushwoosh.setCommunicationEnabled(true);
          Alert.alert("Communication with Pushwoosh was enabled");
        } catch(error) {
          console.error("Failed to enable communication with Pushwoosh:", error);
        }
        
    } else {
        try {
          Pushwoosh.setCommunicationEnabled(false);
          Alert.alert("Communication with Pushwoosh was disabled");
        } catch(error) {
          console.error("Failed to disable communication with Pushwoosh:", error);
        }
    }
  }, [isEnabledServer]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={styles.title}>Pushwoosh Demo</Text>
        <Image source={require("../assets/images/top_logo.png")} style={styles.logo} />

        <View style={styles.row}>
          <Text style={styles.label}>Register For Push Notifications</Text>
          <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabledRegister ? "#00e6a0" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchNotification}
              value={isEnabledRegister}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Server Communication Enabled</Text>
          <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabledServer ? "#00e6a0" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchServerCommunication}
              value={isEnabledServer}
          />
        </View>

        <ButtonWithTextInput
            buttonText="Set User ID"
            onPress={(id) => {
              if (id.trim() === "") {
                Alert.alert("Value cannot be empty");
              } else {
               /**
                * Set the user identifier. This could be a Facebook ID, username, email, or any other user ID. 
                * This allows data and events to be matched across multiple user devices.
                *
                * PUSHWOOSH CODE
                *    |   |
                *   _|   |_
                *   \     /
                *    \   /
                *     \_/
                */
                Pushwoosh.setUserId(id,() => {
                  Alert.alert("User ID set successfully:", id);
                }, (error) => {
                  console.error("Failed to set User ID:", error);
                  Alert.alert("Failed to set User ID");
                });
              }
            }}
            placeholder1="User ID"
        />
        
        <ButtonWithTextInput
            buttonText="Post Event"
            onPress={(event) => {
              if (event.trim() === "") {
                Alert.alert("Value cannot be empty");
              } else {
               /**
                * Post events for In-App Messages. This can trigger In-App message HTML as specified in the Pushwoosh Control Panel.
                * [event] is the string name of the event.
                * [attributes] is a map that contains additional event attributes.
                * 
                * PUSHWOOSH CODE 
                *    |   |
                *   _|   |_
                *   \     /
                *    \   /
                *     \_/
                */
                Pushwoosh.postEvent(event, { attribute1: "value1", attribute2: "value2" });
                Alert.alert("Event posted: ", event);
              }
            }}
            placeholder1="Event Name"
        />

        <ButtonWithTextInput
            buttonText="Set Language"
            onPress={(language) => {
               /**
                * Set custom language
                * Device language used by default.
                * Set to null if you want to use device language again.
                * 
                * PUSHWOOSH CODE 
                *    |   |
                *   _|   |_
                *   \     /
                *    \   /
                *     \_/
                */
                Pushwoosh.setLanguage(language);
                if(language.trim() === "") {
                  Alert.alert("Language set to device's default language")                  
                } else {
                  Alert.alert("Language set: ", language.toLocaleLowerCase());
                }
            }}
            placeholder1="Language Code"
        />
        
        <ButtonWithTextInput
            buttonText="Set Tags"
            onPress={(keyValue, inputValue) => {
              if (!keyValue || !inputValue) {
                Alert.alert("Error", "Both key and value must be provided");
                return;
              } else {
              /**
              * Associates device with given [tags].
              * If setTags request fails tags will be reset on the next application launch.
              * 
              * PUSHWOOSH CODE 
              *    |   |
              *   _|   |_
              *   \     /
              *    \   /
              *     \_/
              */
                Pushwoosh.setTags({ "key": keyValue, "value": inputValue },
                  () => {
                  Alert.alert("Tags set successfully:", keyValue + ": " + inputValue);
                }, (error) => {
                  console.error("Failed to set tags:", error);
                });
              }
            }}
            placeholder1="Tag Key"
            placeholder2="Tag Value"
        />

        <ButtonWithTextInput
            buttonText="Set User Emails"
            onPress={(userId, emails) => {
              if (!userId || !emails) {
                Alert.alert("Error", "Both user ID and emails must be provided");
                return;
              } else {
                /**
                  * Register email list associated with the current user
                  *             
                  * PUSHWOOSH CODE 
                  *    |   |
                  *   _|   |_
                  *   \     /
                  *    \   /
                  *     \_/
                  */
                Pushwoosh.setUserEmails(
                  userId,
                  [emails],
                  () => { Alert.alert("User emails were successfully set"); },
                  (error) => { console.error("Failed to set emails:", error); }
                );
              }
            }}
            placeholder1="User ID"
            placeholder2="Emails"
        />

<ButtonWithTextInput
            buttonText="Set Emails"
            onPress={(emails) => {
              if (!emails) {
                Alert.alert("Error", "Emails must be provided");
                return;
              } else {
                /**
                  * Register email list associated with the current user
                  *             
                  * PUSHWOOSH CODE 
                  *    |   |
                  *   _|   |_
                  *   \     /
                  *    \   /
                  *     \_/
                  */
                try {
                  Pushwoosh.setEmails(
                      [emails],
                      () => {
                          Alert.alert("User emails were successfully set");
                      },
                      (error) => {
                          console.error("Failed to set emails: ", error);
                          Alert.alert("Failed to set emails: " + error.message);
                      }
                  );
                } catch (error) {
                    console.error("Error in setting emails: ", error);
                    Alert.alert("Error in setting emails: " + error);
                }
              }
            }}
            placeholder1="Emails"
        />

      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            /**
            * Pushwoosh HWID associated with current device
            * 
            * PUSHWOOSH CODE 
            *    |   |
            *   _|   |_
            *   \     /
            *    \   /
            *     \_/
            */      
            Pushwoosh.getHwid((hwid) => {
              Alert.alert('HWID has been copied to clipboard: ', hwid);
              Clipboard.setStringAsync(hwid);
            });
          }}>
          <Text style={styles.buttonText}>Get HWID</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
           /**
            * Push notification token or null if device is not registered yet
            * 
            * PUSHWOOSH CODE 
            *    |   |
            *   _|   |_
            *   \     /
            *    \   /
            *     \_/
            */
            Pushwoosh.getPushToken((token) => {
              Alert.alert('Push token has been copied to clipboard: ', token);
              Clipboard.setStringAsync(token);
            });
          }}>
          <Text style={styles.buttonText}>Get push token</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
           /**
            * Get Pushwoosh User ID
            * 
            * PUSHWOOSH CODE 
            *    |   |
            *   _|   |_
            *   \     /
            *    \   /
            *     \_/
            */
            Pushwoosh.getUserId((userId) => {
              Alert.alert('User ID has been copied to clipboard:: ', userId);
              Clipboard.setStringAsync(userId);
            });
          }}>
          <Text style={styles.buttonText}>Get user ID</Text>
        </TouchableOpacity>
      </View>

      </ScrollView>
    </ThemeProvider>
  );
}

// This event is fired when the push is received in the app
DeviceEventEmitter.addListener("pushReceived", (e) => {
  console.warn("Push Received: " + JSON.stringify(e));
  // Additional custom logic can be implemented here
});

// This event is fired when a user clicks on notification
DeviceEventEmitter.addListener("pushOpened", (e) => {
  console.warn("Push Opened:" + JSON.stringify(e));
  // Additional custom logic can be implemented here
});

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 10,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 40,
  },
  logo: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
      marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    padding: 6,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    marginRight: 10,
  },
  button: {
    backgroundColor: '#0096FF',
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    shadowColor: '#000', 
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
  }
});
