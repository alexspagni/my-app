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

const { store, persistor } = ConfiguereStore();
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationContainerRef}>
          <Stack.Navigator initialRouteName="drawer">
            <Stack.Screen
              name="drawer"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Search"
              component={SerchScreen}
              options={{
                presentation: "modal",
                headerRight: () => (
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigationContainerRef.current?.navigate(
                          "InfoSearchScreen"
                        )
                      }
                    >
                      <MaterialCommunityIcons
                        name="information-variant"
                        size={30}
                        style={{ paddingRight: 15 }}
                      />
                    </TouchableOpacity>
                  </View>
                ),
              }}
            />
            <Stack.Screen
              name="ShowScreen"
              component={ShowScreen}
              options={{
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
            <Stack.Screen
              name="ImagesLoading"
              component={ImagesLoading}
              options={{
                presentation: "modal",
                headerMode: "screen",
                headerStyle: {
                  height: 80, // Specify the height of your custom header
                },
                header: () => {
                  return (
                    <View style={{ height: 60 }}>
                      <Text
                        style={{ marginLeft: 120, marginTop: 25, fontSize: 18 }}
                      >
                        Cached Images
                      </Text>
                    </View>
                  );
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
