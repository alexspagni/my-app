import React from "react";
import { SkeletonList } from "../skeleton/SkeletonList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export const LoadingScreen = () => {
  const navigation = useNavigation<any>();
  const autoLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      navigation.navigate("drawer");
    } else {
      navigation.navigate("SigningStackNavigator");
    }
  };
  useFocusEffect(() => {
    setTimeout(autoLogin, 2000);
  });
  return <SkeletonList />;
};
