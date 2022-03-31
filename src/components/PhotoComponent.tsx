import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
/**
 * this component is used to show an image.
 * It receive just one parameter which is an object. This object contains the image url.
 * Every time a use tap on an image, will be rendered to show screen to see the detail of this image.
 *
 */
const PhotoComponent = ({ object }: any) => {
  const navigation = useNavigation<any>();
  const [color, setColor] = useState("grey");
  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ShowScreen", { image: object });
        }}
      >
        <Image source={{ uri: object.img_src }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.innerContainer}>
        <Text style={styles.textStyle}>Image ID: {object.id}</Text>
        <TouchableOpacity
          onPress={() => {
            if (color === "grey") {
              setColor("#2E8AF6");
            } else {
              setColor("grey");
            }
          }}
        >
          <Feather
            name="bookmark"
            size={24}
            color={color}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {},
  image: {
    width: 327,
    height: 180,
    borderRadius: 16,
    marginLeft: 10,
  },
  likeStyle: {
    marginLeft: 12,
  },
  textStyle: {
    fontSize: 14,
    color: "white",
    marginLeft: 15,
    marginTop: 1,
  },
  innerContainer: {
    flexDirection: "row",
    marginTop: 25,
  },
  iconStyle: {
    marginLeft: 170,
    fontSize: 22,
  },
});
export default PhotoComponent;
