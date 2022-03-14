import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

export const hideImageAlert = () =>
  Alert.alert("Hiding", "this image is now hided", [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "OK" },
  ]);

export const imageNotFoundAlert = () =>
  Alert.alert("Warning", "Images not found", [
    {
      text: "Cancel",
      style: "cancel",
    },
    { text: "OK" },
  ]);
export const indexScreenFilterAlert = () =>
  Alert.alert(
    "Hello Message",
    "In these screen i'll you can set some filter about \n images",
    [{ text: "OK" }]
  );
