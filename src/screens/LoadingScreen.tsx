import React, { useEffect } from "react";
import { SkeletonList } from "../skeleton/SkeletonList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getStoredImagesHidedDevice } from "../filters/FIlters";
import { useDispatch } from "react-redux";

export const LoadingScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const prova = async () => {
    const result3 = await getStoredImagesHidedDevice();
    console.log(result3);
    dispatch({
      type: "images_hide_all",
      payload: result3,
    });
  };
  useEffect(() => {
    try {
      prova();
    } catch {
      console.log("sono qui");
    }
  }, []);
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
