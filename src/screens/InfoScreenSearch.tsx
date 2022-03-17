import React from "react";
import { View, StyleSheet, Modal, Pressable } from "react-native";
import { Text } from "react-native-elements";
import { navigationContainerRef } from "../Navigator/ContainerRef";

export const InfoScreenSearch = () => {
  return (
    <View style={style.ModalStyle}>
      <Modal transparent>
        <Pressable
          style={style.ModalStyle}
          onPress={navigationContainerRef.current?.goBack}
        >
          <View style={style.containerStyle}>
            <Text h2>Info point</Text>
            <Text>How to Search Screen</Text>
            <Text>1)In the Search screen you can set some filter.</Text>
            <Text>2You can search a rover by name or by date</Text>
            <Text>
              3)With the toggle button you can hide all photos you have on the
              current Home screen.
            </Text>
            <Text>4)Tap on "search Button" to make a search</Text>
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
