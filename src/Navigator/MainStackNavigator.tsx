import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import IndexScreen from "../screens/IndexScreen";
import FormSearch from "../components/FormSearch";
import { InfoScreenHome } from "../InfoPointScreen/InfoScreenHome";
import { InfoScreenSearch } from "../InfoPointScreen/InfoScreenSearch";
import { InfoScreenImageNotFound } from "../InfoPointScreen/InfoScreenImageNotFound";
import { SignIn } from "../screens/SingIn";
import { SignUp } from "../screens/SIgnUp";
const Stack = createStackNavigator();
/**
 * navigator used to navigated between signIn screen and SignUp screen
 */
export const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="IndexScreen">
      <Stack.Screen
        name="IndexScreen"
        component={IndexScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={FormSearch}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="InfoScreenHome"
        component={InfoScreenHome}
        options={{
          headerShown: false,
          presentation: "transparentModal",
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="InfoSearchScreen"
        component={InfoScreenSearch}
        options={{
          headerShown: false,
          presentation: "transparentModal",
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="InfoScreenImageNotFound"
        component={InfoScreenImageNotFound}
        options={{
          headerShown: false,
          presentation: "transparentModal",
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
    </Stack.Navigator>
  );
};
