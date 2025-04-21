import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

// Button tái sử dụng
const Project3 = (props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.button, props.buttonStyle]}
  >
    <Text style={[styles.text]}>{props.text}</Text>
  </TouchableOpacity>
);

export default () => {
  return (
    <View style={styles.container}>
      <Project3
        text="Say hello"
        onPress={() => alert("Hello!")}
        buttonStyle={{ backgroundColor: "#ff637c" }}
      />
      <Project3
        text="Say goodbye"
        onPress={() => alert("Goodbye!")}
        buttonStyle={{ backgroundColor: "#4dd2c2" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // thêm cho cân giữa theo chiều ngang
  },
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
