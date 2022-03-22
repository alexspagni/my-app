import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { InfoScreenComponent } from "../components/InfoScreenComponent";
const Information = () => {
  return (
    <View style={style.containerStyle}>
      <Text h2>Info point</Text>
      <Text>
        This images has been hided,so you can't see any detail of this image
      </Text>
    </View>
  );
};
export const InfoScreenImagesHide = () => {
  return (
    <InfoScreenComponent>
      <Information />
    </InfoScreenComponent>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    width: "75%",
    height: "40%",
    padding: 16,
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
