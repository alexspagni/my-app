import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "./Skeleton";

export const SkeletonList = () => {
  return (
    <View>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15,
  },
  FlatListStyle: {
    paddingTop: 10,
  },
});
