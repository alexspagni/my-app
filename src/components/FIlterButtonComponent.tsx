import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { FilterButtonComponentType } from "../type/differentType";

/**
 * This component is used as skeleton to every button filter into IndexScreen (an example: All,Photos,Date...).
 * It receive five parameter:
 * buttonName-->just the name of the button
 * onPressButton--> a function that is run every time the user press this button. Logic of this button is into IndexScreen
 * buttonWidth-->width of the button
 * buttonHeight-->height of the button
 * color-->color that button has in different case
 * setColor-->function that set the color of the button.
 */
export const FilterButtonComponent: React.FC<FilterButtonComponentType> = (
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
