import React from "react";
import { View, StyleSheet, Modal, Pressable } from "react-native";
import { Text } from "react-native-elements";
import { navigationContainerRef } from "../Navigator/ContainerRef";

export const InfoScreenHome = () => {
  return (
    <View style={style.ModalStyle}>
      <Modal transparent>
        <Pressable
          style={style.ModalStyle}
          onPress={navigationContainerRef.current?.goBack}
        >
          <View style={style.containerStyle}>
            <Text h2>Info point</Text>
            <Text>How to use this App:</Text>
            <Text>
              1)In the Home screen you can see all the images you searched.
            </Text>
            <Text>2)To search other images just tap on magnifying glass.</Text>
            <Text>
              3)If you want to log out just tap on the drawer Icon and then tap
              on Log Out option, you will be redirected on another screen where
              you just have to tap on the red button.
            </Text>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    width: "75%",
    padding: 16,
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  ModalStyle: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
});
