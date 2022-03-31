import { Alert } from "react-native";
import { navigationContainerRef } from "../Navigator/ContainerRef";

export const hideImageAlert = () =>
  Alert.alert("Hiding", "this image is now hided", [
    {
      text: "Cancel",
      onPress: () =>
        navigationContainerRef.current?.navigate("MainStackNavigator"),
      style: "cancel",
    },
    {
      text: "OK",
      onPress: () =>
        navigationContainerRef.current?.navigate("MainStackNavigator"),
      style: "default",
    },
  ]);
