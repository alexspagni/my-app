import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from "../screens/SingIn";
import { SignUp } from "../screens/SIgnUp";

const Stack = createStackNavigator();
/**
 * navigator used to navigated between signIn screen and SignUp screen
 */
export const SigningStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
