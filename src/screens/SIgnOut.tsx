import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export const SignOut = () => {
  return (
    <View style={styles.container}>
      <Button title="LogOut" onPress={() => console.log("you log out")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    justifyContent: "center",
    backgroundColor: "#353839",
    flex: 1,
  },
  TextStyle: {
    fontSize: 18,
    color: "white",
  },
});
