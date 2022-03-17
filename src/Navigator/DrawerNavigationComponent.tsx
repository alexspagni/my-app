import * as React from "react";
import { Image } from "react-native";
import { createDrawerNavigator, DrawerView } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import IndexScreen from "../screens/IndexScreen";
import ShowScreen from "../screens/ShowScreen";
import { TouchableOpacity } from "react-native";
import { navigationContainerRef } from "./ContainerRef";
import FormSearch from "../components/FormSearch";
import CustomSidebarMenu from "./CustomSidebarMenu";
import { LogOut } from "../screens/LogOut";
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
          drawerLabel: "Home",

          title: "Home",

          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigationContainerRef.current?.navigate("Search")}
            >
              <Feather name="search" size={30} style={{ paddingRight: 10 }} />
            </TouchableOpacity>
          ),
          drawerIcon: (): any => {
            return <LogoTitle />;
          },
        }}
      />

      <Drawer.Screen
        name="LogOut"
        component={LogOut}
        options={{
          title: "Log Out",
          drawerIcon: (): any => {
            return <LogoTitle />;
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
