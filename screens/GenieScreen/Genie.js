import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Genie() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Ginie</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});
