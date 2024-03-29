import { View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { expressApi } from "../api/getApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signType, stateUser } from "../type/differentType";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import { addError, addToken, removeError } from "../reducers/singReducer";
import React from "react";
import { SignComponent } from "../components/SingComponent";
import { ButtonComponent } from "../components/ButtonComponent";
import {
  setLoadingReducer,
  setSearchReducer,
} from "../reducers/setLoadingReducer";
import { useNavigation } from "@react-navigation/native";

export const SignIn = ({ navigation }: any) => {
  const signState: stateUser = useSelector((store: any) => store?.sing);
  const dispatch = useDispatch<any>();
  const search = useSelector((store: any) => store?.search);
  const navigations = useNavigation<any>();
  //Function to sign in a user that already exist on mongoDB database
  const signIn = async ({ email, password }: signType) => {
    try {
      const response = await expressApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch(setLoadingReducer(true));
      dispatch(setSearchReducer(!search));
      dispatch(addToken(response.data.token));
      navigationContainerRef.current?.navigate("MainStackNavigator");
    } catch (err: any) {
      console.log(err.message);
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
      <SignComponent
        headerText="Sign in"
        onSubmit={signIn}
        error_message={signState.error_message}
        buttonName="Sign in"
      />

      <Text
        style={{
          fontSize: 21,
          color: "white",
          top: 5,
        }}
      >
        or
      </Text>
      <View style={styles.ButtonView}>
        <ButtonComponent
          buttonColor="#2E8AF6"
          buttonName="Sign up"
          heightButton={44}
          buttonWidth={230}
          onPressButton={() =>
            navigationContainerRef.current?.navigate("SignUp")
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerStyle: {
    paddingTop: 50,
    backgroundColor: "#181A1C",
    alignItems: "center",
    flex: 1,
  },
  ButtonView: {
    marginTop: 15,
  },
});
