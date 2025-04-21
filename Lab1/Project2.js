import React from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Project2 = () => {
  return (
    <View style={MyStyle.container}>
      <Button 
        title="Button 1" 
        onPress={() => Alert.alert("Hello 1")} 
      />

      <TouchableOpacity 
        style={MyStyle.button} 
        onPress={() => Alert.alert("Hello 2")}
      >
        <Text style={MyStyle.text}>Button 2</Text>
      </TouchableOpacity>
    </View>
  );
};

const MyStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center" // giúp Button 2 nằm giữa theo chiều ngang
  },
  button: {
    backgroundColor: "blue",
    marginTop: 10,
    alignItems: "center",
    padding: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
  }
});

export default Project2;
