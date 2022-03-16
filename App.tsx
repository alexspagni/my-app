import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/Navigator/DrawerNavigationComponent";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./src/reducers";
import { createStackNavigator } from "@react-navigation/stack";
import SerchScreen from "./src/screens/SearchScreen";
import { navigationContainerRef } from "./src/Navigator/ContainerRef";
import { SigningStackNavigator } from "./src/Navigator/SigningStackNavigator";
import { LoadingScreen } from "./src/screens/LoadingScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={createStore(reducers)}>
      <NavigationContainer ref={navigationContainerRef}>
        <Stack.Navigator initialRouteName="loading">
          <Stack.Screen
            name="drawer"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            component={SerchScreen}
            options={{ presentation: "modal" }}
          />
          <Stack.Screen
            name="SigningStackNavigator"
            component={SigningStackNavigator}
            options={{ headerShown: false, presentation: "modal" }}
          />
          <Stack.Screen
            name="loading"
            component={LoadingScreen}
            options={{ headerShown: false, presentation: "modal" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
