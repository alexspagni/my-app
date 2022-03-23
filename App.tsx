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
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ConfiguereStore from "./src/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { ImagesLoading } from "./src/skeleton/ImagesLoading";
const { store, persistor } = ConfiguereStore();
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
              name="ImagesLoading"
              component={ImagesLoading}
              options={{
                headerShown: false,
                presentation: "modal",
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
