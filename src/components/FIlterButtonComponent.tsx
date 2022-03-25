import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
type FilterButtonComponent = {
  buttonName: string;

  onPressButton: () => void;
  buttonWidth: number;
  buttonHeight: number;
};
export const FilterButtonComponent: React.FC<FilterButtonComponent> = (
  props
) => {
  const [color, setColor] = useState("#727477");
  return (
    <TouchableOpacity
      onPress={() => {
        if (color === "#2E8AF6") {
          setColor("#727477");
        } else if (color === "#727477") {
          setColor("#2E8AF6");
        }
      }}
      style={[
        styles.appButtonContainer,
        {
          backgroundColor: color,
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
