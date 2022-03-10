import React from "react";
import { View } from "react-native";
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
