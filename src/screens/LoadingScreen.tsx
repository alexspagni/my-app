import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { GravitazionalWave } from "../skeleton/GravitazionalWave";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../reducers/singReducer";

export const LoadingScreen = () => {
  const navigation = useNavigation<any>();
  const images = useSelector((store: any) => store?.images);
  const dispatch = useDispatch();
  const autoLogin = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      if (images.length) {
        navigation.navigate("ImagesLoading");
      } else {
        navigation.navigate("drawer");
      }
    } else {
      navigation.navigate("SigningStackNavigator");
    }
  };

  useFocusEffect(() => {
    setTimeout(autoLogin, 4000);
  });
  return <GravitazionalWave />;
};

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
