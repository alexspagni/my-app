import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { navigationContainerRef } from "./src/Navigator/ContainerRef";
import { SigningStackNavigator } from "./src/Navigator/SigningStackNavigator";
import { LoadingScreen } from "./src/screens/LoadingScreen";
import ShowScreen from "./src/screens/ShowScreen";
import ConfigureStore from "./src/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { ImagesLoading } from "./src/skeleton/ImagesLoading";
import { MainStackNavigator } from "./src/Navigator/MainStackNavigator";
import { invertedForHorizontalIOS } from "./src/Navigator/InvertedForHorizontalIOS";

const { store, persistor } = ConfigureStore();
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationContainerRef}>
          <Stack.Navigator initialRouteName="loading">
            <Stack.Screen
              name="MainStackNavigator"
              component={MainStackNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ShowScreen"
              component={ShowScreen}
              options={(props: any) => ({
                headerShown: false,
                cardStyleInterpolator:
                  props?.route?.params?.slide == "right"
                    ? invertedForHorizontalIOS
                    : CardStyleInterpolators.forHorizontalIOS,
              })}
            />

            <Stack.Screen
              name="SigningStackNavigator"
              component={SigningStackNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="loading"
              component={LoadingScreen}
              options={{ headerShown: false, presentation: "modal" }}
            />

            <Stack.Screen
              name="ImagesLoading"
              component={ImagesLoading}
              options={{
                headerShown: false,
                presentation: "modal",
                headerMode: "screen",
                headerStyle: {
                  height: 80, // Specify the height of your custom header
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
