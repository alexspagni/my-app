import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/Navigator/DrawerNavigationComponent";
import { Provider } from "react-redux";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import SerchScreen from "./src/screens/SearchScreen";
import { navigationContainerRef } from "./src/Navigator/ContainerRef";
import { SigningStackNavigator } from "./src/Navigator/SigningStackNavigator";
import { LoadingScreen } from "./src/screens/LoadingScreen";
import ShowScreen from "./src/screens/ShowScreen";
import { InfoScreenSearch } from "./src/InfoPointScreen/InfoScreenSearch";
import { InfoScreenHome } from "./src/InfoPointScreen/InfoScreenHome";
import { TouchableOpacity, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ConfiguereStore from "./src/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { ImagesLoading } from "./src/skeleton/ImagesLoading";
import { InfoScreenImageNotFound } from "./src/InfoPointScreen/InfoScreenImageNotFound";
import FormSearch from "./src/components/FormSearch";
import { MainStackNavigator } from "./src/Navigator/MainStackNavigator";

const { store, persistor } = ConfiguereStore();
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
              options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
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
