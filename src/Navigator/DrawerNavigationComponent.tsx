import * as React from "react";
import { Image, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import IndexScreen from "../screens/IndexScreen";
import { TouchableOpacity } from "react-native";
import { navigationContainerRef } from "./ContainerRef";
import { LogOut } from "../screens/LogOut";
import ImagesHide from "../screens/ImagesHide";

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
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() =>
                  navigationContainerRef.current?.navigate("InfoScreenHome")
                }
              >
                <MaterialCommunityIcons
                  name="information-variant"
                  size={30}
                  style={{ paddingRight: 15 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigationContainerRef.current?.navigate("Search")
                }
              >
                <Feather name="search" size={30} style={{ paddingRight: 10 }} />
              </TouchableOpacity>
            </View>
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
      <Drawer.Screen
        name="ImagesHided"
        component={ImagesHide}
        options={{
          title: "ImagesHide",
          drawerIcon: (): any => {
            return <LogoTitle />;
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
