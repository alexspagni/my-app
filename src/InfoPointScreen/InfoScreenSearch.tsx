import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { InfoScreenComponent } from "../components/InfoScreenComponent";
const Information = () => {
  return (
    <View style={style.containerStyle}>
      <Text h2>Info point</Text>
      <Text>How to Data filter works</Text>
      <Text>
        1)Just write a date in belows input text and press on "search by date"
        button
      </Text>
      <Text>2)If you want to go back to home just press on "X" icon</Text>
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
