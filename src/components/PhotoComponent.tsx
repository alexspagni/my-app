import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Image, Pressable } from "react-native";

const PhotoComponent = ({ object }: any) => {
  const navigation = useNavigation<any>();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("ShowScreen", { image: object });
      }}
      onLongPress={() => console.log("long press")}
    >
      <Image source={{ uri: object.img_src }} style={styles.image} />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
  },
  imageLongPress: {
    width: 400,
    height: 200,
    borderRadius: 4,
  },
});
export default PhotoComponent;
