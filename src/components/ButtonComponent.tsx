import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
type ButtonComponentType = {
  buttonName: string;
  buttonColor: string;
  buttonWidth: number;
};
export const ButtonComponent: React.FC<ButtonComponentType> = ({
  buttonName,
  buttonColor,
  buttonWidth,
}) => {
  return (
    <Button
      title={buttonName}
      buttonStyle={{
        backgroundColor: "#2E8AF6",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 30,
      }}
      containerStyle={{
        width: 120,
        marginHorizontal: 50,
        marginVertical: 20,
        marginLeft: 100,
      }}
      titleStyle={{ fontWeight: "bold" }}
    />
  );
};
