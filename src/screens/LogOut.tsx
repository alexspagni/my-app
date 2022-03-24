import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetToken } from "../reducers/singReducer";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import { getTokenFromStore } from "../filters/FIlters";
import { LIBRARIES_USER_IMAGES } from "../reducers/UserImagesReducer";

export const LogOut = () => {
  const dispatch = useDispatch<any>();
  const images = useSelector((store: any) => store?.images);
  const [token, setToken] = useState("");
  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    dispatch(resetToken(""));
    //dispatch({ type: "images_reset", payload: [] });
    navigationContainerRef.current?.navigate("loading");
  };

  const getToken = async () => {
    try {
      const tokenStore = await getTokenFromStore();
      console.log(tokenStore);
      setToken(tokenStore as string);
    } catch {
      console.log("some error1");
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  return (
    <View style={styles.container}>
      <Text h4 style={styles.TextStyle}>
        Tap the button to log out
      </Text>
      <Button
        title="LOG OUT"
        buttonStyle={{
          backgroundColor: "red",
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 30,
        }}
        containerStyle={{
          width: 150,
          marginHorizontal: 50,
          marginVertical: 20,
          marginLeft: 100,
        }}
        titleStyle={{ fontWeight: "bold" }}
        onPress={() => {
          dispatch({
            type: LIBRARIES_USER_IMAGES,
            payload: { images: images, token: token },
          });
          logOut();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,

    backgroundColor: "#353839",
    flex: 1,
  },
  TextStyle: {
    color: "white",
  },
});
