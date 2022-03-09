import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { navigationContainerRef } from "../Navigator/ContainerRef";

export const BackToIndexScreen = () => {
  useFocusEffect(() => {
    navigationContainerRef.current?.navigate("drawer");
  });
  return <View></View>;
};
