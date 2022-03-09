import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { indexScreenFilterAlert } from "../alertMessages/alertMessage";
export const IndexScreenFilters = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.TextStyle}>
        Here you can set some filter about images you searched or you are going
        to search.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderColor: "black",
    backgroundColor: "#353839",
    borderWidth: 2,
    flex: 1,
  },
  TextStyle: {
    fontSize: 20,
    color: "white",
    alignItems: "center",
  },
});
