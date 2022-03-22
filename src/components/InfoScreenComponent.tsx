import React from "react";
import { View, StyleSheet, Modal, Pressable } from "react-native";
import { navigationContainerRef } from "../Navigator/ContainerRef";

export const InfoScreenComponent = (props: any) => {
  return (
    <View style={style.ModalStyle}>
      <Modal transparent>
        <Pressable
          style={style.ModalStyle}
          onPress={navigationContainerRef.current?.goBack}
        >
          {props.children}
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
