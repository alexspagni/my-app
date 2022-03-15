import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from "../screens/SingIn";
import { SignUp } from "../screens/SIgnUp";

const Stack = createStackNavigator();

export const SigningStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};
