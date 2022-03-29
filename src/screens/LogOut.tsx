import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetToken } from "../reducers/singReducer";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import { ButtonComponent } from "../components/ButtonComponent";
export const LogOut = () => {
  const dispatch = useDispatch<any>();
  /**
   * These screen is used just to allow user to Log Out.
   * User will be redirected on the sign in screen.
   */
  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    dispatch(resetToken(""));
    navigationContainerRef.current?.navigate("SigningStackNavigator");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.TextStyle}>Press to logOut</Text>
      <View style={styles.innerContainer}>
        <ButtonComponent
          buttonColor="#2E8AF6"
          buttonName="Log Out"
          buttonWidth={234}
          heightButton={44}
          onPressButton={() => logOut()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: "#181A1C",
    flex: 1,
  },
  TextStyle: {
    color: "white",
    marginTop: 10,
    marginLeft: 30,
    fontSize: 25,
  },
  innerContainer: {
    marginLeft: 65,
    marginTop: 30,
  },
});
