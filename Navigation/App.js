import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Screens
import ChooseLocation from './components/Screens/ChooseLocation';
import Navigation from './components/Screens/Navigation';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Navigation' component={Navigation}></Stack.Screen>
        <Stack.Screen name='ChooseLocation' component={ChooseLocation}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

