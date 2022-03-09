import * as React from "react";
import { Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ShowScreen from "../screens/ShowScreen";
import { IndexScreenFilters } from "../screenFilters/IndexScreenFilters";
import { BackToIndexScreen } from "../screenFilters/Back";
import { RoverDataNameFilter } from "../screenFilters/RoverNameFilter";

const Drawer = createDrawerNavigator();
const LogoTitle: React.FC<any> = () => {
  return (
    <Image
      style={{ width: 40, height: 40 }}
      source={require("../Images/unipr_logo.jpg")}
    />
  );
};
const DrawerNavigatorFilter = () => {
  return (
    <Drawer.Navigator initialRouteName="IndexScreenFilters">
      <Drawer.Screen
        name="IndexScreenFilters"
        component={IndexScreenFilters}
        options={{
          title: "Home",
          drawerIcon: (): any => {
            return <LogoTitle />;
          },
        }}
      />

      <Drawer.Screen
        name="Data/Namefilter"
        component={RoverDataNameFilter}
        options={{
          drawerIcon: (): any => {
            return <LogoTitle />;
          },
        }}
      />
      <Drawer.Screen
        name="BackToImage"
        component={BackToIndexScreen}
        options={{
          drawerIcon: (): any => {
            return <LogoTitle />;
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorFilter;
