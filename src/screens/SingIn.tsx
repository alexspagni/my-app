import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { expressApi } from "../api/getApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SignScreen } from "../components/SignScreen";
import { signType, state } from "../type/differentType";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import { addError, addToken, removeError } from "../reducers/singReducer";
import React from "react";

export const SignIn = ({ navigation }: any) => {
  const signState: state = useSelector((store: any) => store?.sing);
  const dispatch = useDispatch<any>();
  //Function to sign in a user that already exist on mongoDB database
  const signIn = async ({ email, password }: signType) => {
    try {
      const response = await expressApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch(addToken(response.data.token));
      navigationContainerRef.current?.navigate("drawer");
    } catch (err: any) {
      dispatch(addError("Something is gone wrong with Sign In"));
    }
  };
  //Every time i go to signIn screen i want to clear error message appear at the bottom of the screen
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
      <SignScreen
        HeaderScreen="Sing In to your account"
        ButtonTitle="Sign In"
        BottomText={`Don't you have an account?\nSign Up`}
        pageToNavigate="SignUp"
        error_message={signState.error_message}
        onSubmit={signIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerStyle: {
    paddingTop: 50,
  },
});