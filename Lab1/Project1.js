// Lab1/Project1.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HelloWorld = () => {
  return (
    <View style={styles.ViewStyle}>
      <Text style={styles.TextStyle}>Hello World</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ViewStyle: {
    width: 100,
    height: 100,
    backgroundColor: 'aqua',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextStyle: {
    color: 'black',
  },
});

export default HelloWorld; // <-- quan trọng!
