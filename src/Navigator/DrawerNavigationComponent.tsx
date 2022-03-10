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
const Drawer = createDrawerNavigator();
const LogoTitle: React.FC<any> = () => {
  return (
    <Image
      style={{ width: 40, height: 40 }}
      source={require("../Images/unipr_logo.jpg")}
    />
  );
};
export const drawerItemsMain = [
  {
    key: "Home",
    title: "Home",
    route: { nav: "MainDrawer", routeName: "Home", title: "Home" },
  },
  {
    key: "Settings",
    title: "Settings",
    route: { nav: "MainDrawer", routeName: "Settings", title: "Settings" },
  },
];

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >
      <Drawer.Screen
        name="IndexScreen"
        component={IndexScreen}
        options={{
          drawerLabel: "Home",
          title: "section1",
          drawerActiveTintColor: "#e91e63",

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
        name="ShowScreen"
        component={ShowScreen}
        options={{
          drawerLabel: "ShowScreen",
          title: "section1",
          drawerActiveTintColor: "#e91e63",
          drawerIcon: (): any => {
            return <LogoTitle />;
          },
        }}
      />

      <Drawer.Screen
        name="filters"
        component={FormSearch}
        options={{
          drawerLabel: "Filters",
          title: "section2",
          drawerActiveTintColor: "#e91e63",
          drawerIcon: (): any => {
            return <LogoTitle />;
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
