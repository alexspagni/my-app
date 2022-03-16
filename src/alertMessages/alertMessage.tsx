import { Alert } from "react-native";

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
