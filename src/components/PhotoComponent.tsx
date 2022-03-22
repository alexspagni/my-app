import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
const PhotoComponent = ({ object }: any) => {
  const navigation = useNavigation<any>();
  const [heartIcon, setHeartIcon] = useState(true);
  const hides = useSelector((store: any) => store?.imagesHide);
  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        onPress={() => {
          if (hides.includes(object)) {
            navigation.navigate("InfoScreenImagesHide");
          } else {
            navigation.navigate("ShowScreen", { image: object });
          }
        }}
      >
        <Image source={{ uri: object.img_src }} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setHeartIcon(!heartIcon)}>
        <AntDesign
          name={heartIcon ? "hearto" : "heart"}
          size={24}
          color="white"
          style={styles.likeStyle}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
  },
  likeStyle: {
    marginLeft: 15,
  },
});
export default PhotoComponent;
