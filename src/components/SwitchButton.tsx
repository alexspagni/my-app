import React, { useState } from "react";
import { View, Switch, StyleSheet, Text } from "react-native";
type SwitchProps = {
  valueText: string;
  isEnabled: boolean;
  setIsEnabled(s: boolean): void;
};
export const SwitchButton: React.FC<SwitchProps> = ({
  valueText,
  isEnabled,
  setIsEnabled,
}) => {
  return (
    <>
      <Text style={styles.TextStyleSwicth}>{valueText}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#FFFFFF" : "#000000"}
        onValueChange={setIsEnabled}
        value={isEnabled}
        style={styles.SwitchStle}
      />
    </>
  );
};
const styles = StyleSheet.create({
  backgroundStyle: {
    borderColor: "black",
    borderWidth: 4,
    marginHorizontal: 10,
    height: 600,
  },
  TextStyle: {
    alignItems: "center",
  },
  ImputTextContainer: {
    flexDirection: "row",
  },
  switchContainer: {
    flexDirection: "row",
  },
  TextStyleSwicth: {
    paddingRight: 15,
    paddingBottom: 15,
  },
  SwitchStle: {
    position: "absolute",

    right: 120,
    bottom: 1,
  },
});
