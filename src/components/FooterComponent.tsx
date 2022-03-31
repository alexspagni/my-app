import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetToken } from "../reducers/singReducer";
import { useDispatch } from "react-redux";
import { navigationContainerRef } from "../Navigator/ContainerRef";
export const FooterComponent = () => {
  const dispatch = useDispatch();
  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    dispatch(resetToken(""));
    navigationContainerRef.current?.navigate("SigningStackNavigator");
  };
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>Privacy and policy</Text>
      <TouchableOpacity onPress={() => logOut()}>
        <Text style={styles.textStyle}> Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 30,
    marginRight: 20,
  },
  textStyle: { fontSize: 15, color: "white" },
});
