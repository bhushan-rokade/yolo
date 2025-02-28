import React from 'react';
import Navigation from './Navigation/navigation';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    'P-regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'P-bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'P-semibold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'P-extrabold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'A-num': require('./assets/fonts/AnticDidone-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Temporary loading text
  }

  return <Navigation />;
}
