import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
type FilterButtonComponent = {
  buttonName: string;
  onPressButton: () => void;
  buttonWidth: number;
  buttonHeight: number;
  color: string;
  setColor: (s: string) => void;
};
export const FilterButtonComponent: React.FC<FilterButtonComponent> = (
  props
) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.color === "#2E8AF6") {
          props.setColor("#727477");
          props.onPressButton();
        } else if (props.color === "#727477") {
          props.setColor("#2E8AF6");
          props.onPressButton();
        }
      }}
      style={[
        styles.appButtonContainer,
        {
          backgroundColor: props.color,
          width: props.buttonWidth,
          height: props.buttonHeight,
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
    backgroundColor: "black",
    borderRadius: 17,
    paddingVertical: 10,
    marginHorizontal: 8,
  },
  appButtonText: {
    fontSize: 12,
    color: "white",

    alignSelf: "center",
  },
});
