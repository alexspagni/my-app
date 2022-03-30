import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

import { InfoScreenComponent } from "../components/InfoScreenComponent";
const Information = () => {
  return (
    <View style={style.containerStyle}>
      <Text h2>Info point</Text>
      <Text>How to use this App:</Text>
      <Text>1)In the Home screen you can see all the images you searched.</Text>
      <Text>
        2)To search other images just write something on the search bar, just
        remeber that avaible names are:curiosity,opportunity and spirit
      </Text>
      <Text>3)To search by date press on "data" button</Text>
      <Text>
        4)If you want to see all photo you hided just press "photos" button
      </Text>
      <Text>
        5)If you want to hide all current images just press "hide" button
      </Text>
    </View>
  );
};
export const InfoScreenHome = () => {
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
