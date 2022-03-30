import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { ButtonComponentType } from "../type/differentType";
/**
 * This component is used to as skeleton of different button in the app.
 * it receives different props:
 * buttonName-->name of the button
 * buttonColor--> color of the button, it doesn't change
 * buttonWidth-->width of the button
 * onPressButton-->function that runs every time the button is pressed,
 *  logic of this function is inside different screen that use this component
 */
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
