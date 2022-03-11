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

          title: "Home",
          drawerActiveTintColor: "section1",

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
          title: "Details",
          drawerActiveTintColor: "section1",
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
          title: "Filters",
          drawerActiveTintColor: "section2",
          drawerIcon: (): any => {
            return <LogoTitle />;
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
