import * as React from "react";
import { Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import IndexScreen from "../screens/IndexScreen";
import ShowScreen from "../screens/ShowScreen";
import { TouchableOpacity } from "react-native";
import { navigationContainerRef } from "./ContainerRef";

const Drawer = createDrawerNavigator();
const LogoTitle: React.FC<any> = () => {
  return (
    <Image
      style={{ width: 40, height: 40 }}
      source={require("../Images/unipr_logo.jpg")}
    />
  );
};
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="IndexScreen">
      <Drawer.Screen
        name="IndexScreen"
        component={IndexScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigationContainerRef.current?.navigate("Search")}
            >
              <Feather name="search" size={30} />
            </TouchableOpacity>
          ),
          title: "Home",
          drawerIcon: (): any => {
            return <LogoTitle />;
          },
        }}
      />

      <Drawer.Screen
        name="ShowScreen"
        component={ShowScreen}
        options={{
          drawerIcon: (): any => {
            return <LogoTitle />;
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
