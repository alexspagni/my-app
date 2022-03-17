import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/Navigator/DrawerNavigationComponent";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./src/reducers";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import SerchScreen from "./src/screens/SearchScreen";
import { navigationContainerRef } from "./src/Navigator/ContainerRef";
import { SigningStackNavigator } from "./src/Navigator/SigningStackNavigator";
import { LoadingScreen } from "./src/screens/LoadingScreen";
import ShowScreen from "./src/screens/ShowScreen";
import { InfoScreenSearch } from "./src/screens/InfoScreenSearch";
import { InfoScreenHome } from "./src/screens/InfoScreenHome";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
