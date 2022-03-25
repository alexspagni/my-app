import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { expressApi } from "../api/getApi";
import { useDispatch, useSelector } from "react-redux";
import { addError, addToken, removeError } from "../reducers/singReducer";
import { signType, stateUser } from "../type/differentType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import { SignScreen } from "../components/SignScreen";
import React from "react";

import { SignComponent } from "../components/SingComponent";
export const SignUp = ({ navigation }: any) => {
  const signState: stateUser = useSelector((store: any) => store?.sing);
  const dispatch = useDispatch();

  //fucnction to signUp a new user
  const signUp = async ({ email, password }: signType) => {
    try {
      const response = await expressApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch(addToken(response.data.token));
      navigationContainerRef.current?.navigate("drawer");
    } catch (err: any) {
      console.log(err.message);
      dispatch(addError("Something is gone wrong with Sign Up"));
    }
  };

  //Every time i go to signIn screen i want to clear error message appear at the bottom of the screnn
  const clearErrorMessage = () => {
    dispatch(removeError(""));
  };
  //Every time i left this screen i'm going to call clearErrorMessage function
  React.useEffect(
    () => navigation.addListener("blur", () => clearErrorMessage()),
    [navigation]
  );
  return (
    <View style={styles.ContainerStyle}>
      <TouchableOpacity
        style={{ height: 75, width: 75 }}
        onPress={() => navigationContainerRef.current?.goBack()}
      >
        <Image
          source={require("../Images/iconX.png")}
          resizeMode={"contain"}
          style={styles.iconStyle}
        />
      </TouchableOpacity>

      <SignComponent
        headerText="Sign up"
        onSubmit={signUp}
        error_message={signState.error_message}
        buttonName="Sign me up"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerStyle: {
    backgroundColor: "#181A1C",
    flex: 1,
  },
  iconStyle: {
    position: "relative",
    left: 10,
    top: 20,
  },
});
/*
<SignScreen
        HeaderScreen="Sign Up to use App"
        ButtonTitle="Sign Up"
        BottomText={`Do you already have an account?\nSign in`}
        pageToNavigate="SignIn"
        error_message={signState.error_message}
        onSubmit={signUp}
      />

      */
