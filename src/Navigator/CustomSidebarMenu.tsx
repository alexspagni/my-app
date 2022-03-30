import React from "react";
import { SafeAreaView, View, StyleSheet, Text, Image } from "react-native";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { UniPrLogoImage } from "../../assets";
const LogoTitle: React.FC<any> = () => {
  return (
    <Image
      style={{ width: 40, height: 40 }}
      source={UniPrLogoImage}
    />
  );
};
const CustomSidebarMenu = (props: any) => {
  const { state, descriptors, navigation } = props;
  let lastGroupName = "";
  let newGroup = true;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {state.routes.map((route: any) => {
          const { drawerLabel, drawerActiveTintColor, title } =
            descriptors[route.key].options;
          if (lastGroupName !== drawerActiveTintColor) {
            newGroup = true;
            lastGroupName = drawerActiveTintColor;
          } else newGroup = false;
          return (
            <View key={drawerLabel + "-" + Math.random() * 2000}>
              {newGroup ? (
                <View style={styles.sectionContainer}>
                  <Text
                    key={drawerActiveTintColor + "-" + Math.random() * 2000}
                    style={{ marginLeft: 16 }}
                  >
                    {drawerActiveTintColor}
                  </Text>
                  <View style={styles.sectionLine} />
                </View>
              ) : null}
              <DrawerItem
                label={({ color }) => (
                  <Text style={{ color }}>{drawerLabel}</Text>
                )}
                focused={
                  state.index ===
                  state.routes.findIndex((e: any) => e.name === route.name)
                }
                icon={() => <LogoTitle />}
                onPress={() => {
                  navigation.navigate(route.name);
                  // navigation.toggleDrawer();
                }}
              />
            </View>
          );
        })}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  sectionLine: {
    backgroundColor: "gray",
    flex: 1,
    height: 1,
    marginLeft: 10,
    marginRight: 20,
  },
});

export default CustomSidebarMenu;
