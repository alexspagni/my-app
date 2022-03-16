import React, { useEffect } from "react";
import { View } from "react-native";
import { SkeletonList } from "../skeleton/SkeletonList";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { signType, state } from "../type/differentType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

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
  useEffect(() => {
    setTimeout(autoLogin, 2000);
  });
  return <SkeletonList />;
};
