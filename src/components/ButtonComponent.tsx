import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { signType } from "../type/differentType";

type ButtonComponentType = {
  buttonName: string;
  buttonColor: string;
  buttonWidth: number;
  onPressButton: () => void;
  heightButton: number;
};

export const ButtonComponent: React.FC<ButtonComponentType> = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPressButton()}
      style={[
        styles.appButtonContainer,
        {
          width: props.buttonWidth,
          backgroundColor: props.buttonColor,
          height: props.heightButton,
        },
      ]}
    >
      <Text style={styles.appButtonText}>{props.buttonName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 17,
    paddingVertical: 10,
  },
  appButtonText: {
    fontSize: 14,
    color: "#fff",

    alignSelf: "center",
  },
});
