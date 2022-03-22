import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetToken } from "../reducers/singReducer";
import { navigationContainerRef } from "../Navigator/ContainerRef";
export const LogOut = () => {
  const dispatch = useDispatch<any>();
  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    dispatch(resetToken(""));
    //dispatch({ type: "images_reset", payload: [] });
    navigationContainerRef.current?.navigate("loading");
  };

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
        onPress={() => logOut()}
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
