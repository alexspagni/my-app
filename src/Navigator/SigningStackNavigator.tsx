import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from "../screens/SingIn";
import { SignUp } from "../screens/SIgnUp";

const Stack = createStackNavigator();

export const SigningStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Sign Up">
      <Stack.Screen
        name="Sign In"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
