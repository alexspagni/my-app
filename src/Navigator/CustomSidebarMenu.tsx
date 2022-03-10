import React from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";

import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

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
          if (lastGroupName !== title) {
            newGroup = true;
            lastGroupName = title;
          } else newGroup = false;
          return (
            <>
              {newGroup ? (
                <View style={styles.sectionContainer}>
                  <Text key={title} style={{ marginLeft: 16 }}>
                    {title}
                  </Text>
                  <View style={styles.sectionLine} />
                </View>
              ) : null}
              <DrawerItem
                key={route.key}
                label={({ color }) => (
                  <Text style={{ color }}>{drawerLabel}</Text>
                )}
                focused={
                  state.index ===
                  state.routes.findIndex((e: any) => e.name === route.name)
                }
                onPress={() => navigation.navigate(route.name)}
              />
            </>
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
