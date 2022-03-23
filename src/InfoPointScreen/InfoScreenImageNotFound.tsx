import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

import { InfoScreenComponent } from "../components/InfoScreenComponent";
const Information = () => {
  return (
    <View style={style.containerStyle}>
      <Text h2>Info point</Text>
      <Text>Image not found!!</Text>
      <Text>Make another search</Text>
    </View>
  );
};
export const InfoScreenImageNotFound = () => {
  return (
    <InfoScreenComponent>
      <Information />
    </InfoScreenComponent>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    width: "75%",
    padding: 16,
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
