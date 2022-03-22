import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { InfoScreenComponent } from "../components/InfoScreenComponent";
const Information = () => {
  return (
    <View style={style.containerStyle}>
      <Text h2>Info point</Text>
      <Text>How to Search Screen</Text>
      <Text>1)In the Search screen you can set some filter.</Text>
      <Text>2You can search a rover by name or by date</Text>
      <Text>
        3)With the first toggle button you can hide all photos you have on the
        current Home screen.
      </Text>
      <Text>
        4)With the second toggle button you restore all the images you hided. If
        this toggle button is selected you can't hide other images
      </Text>
      <Text>5)Tap on "search Button" to make a search</Text>
    </View>
  );
};
export const InfoScreenSearch = () => {
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
