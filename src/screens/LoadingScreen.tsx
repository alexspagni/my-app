import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { GravitazionalWave } from "../skeleton/GravitazionalWave";

export const LoadingScreen = () => {
  const navigation = useNavigation<any>();
  /*
  const getImageFromDeviceMemory = async () => {
    const result3 = await getStoredImagesHidedDevice();

    dispatch({
      type: "images_hide_all",
      payload: result3,
    });
  };
  useEffect(() => {
    try {
      getImageFromDeviceMemory();
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }, []);
  */
  const autoLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      navigation.navigate("ImagesLoading");
    } else {
      navigation.navigate("SigningStackNavigator");
    }
  };

  useFocusEffect(() => {
    setTimeout(autoLogin, 4000);
  });
  return <GravitazionalWave />;
};
