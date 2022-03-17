import { View, StyleSheet } from "react-native";
import { expressApi } from "../api/getApi";
import { useDispatch, useSelector } from "react-redux";
import { addError, addToken, removeError } from "../reducers/singReducer";
import { signType, state } from "../type/differentType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import { SignScreen } from "../components/SignScreen";
import React from "react";
export const SignUp = ({ navigation }: any) => {
  const signState: state = useSelector((store: any) => store?.sing);
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
      <SignScreen
        HeaderScreen="Sign Up to use App"
        ButtonTitle="Sign Up"
        BottomText={`Do you already have an account?\nSign in`}
        pageToNavigate="SignIn"
        error_message={signState.error_message}
        onSubmit={signUp}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerStyle: {
    paddingTop: 50,
  },
});
