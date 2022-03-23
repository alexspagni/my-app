import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const PhotoComponent = ({ object }: any) => {
  const navigation = useNavigation<any>();
  const [heartIcon, setHeartIcon] = useState(true);

  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ShowScreen", { image: object });
        }}
      >
        <Image source={{ uri: object.img_src }} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
  },
  image: {
    width: 300,
    height: 150,
    borderRadius: 4,
    marginLeft: 10,
  },
  likeStyle: {
    marginLeft: 12,
  },
});
export default PhotoComponent;

/**
 * <TouchableOpacity onPress={() => setHeartIcon(!heartIcon)}>
        <AntDesign
          name={heartIcon ? "hearto" : "heart"}
          size={24}
          color="white"
          style={styles.likeStyle}
        />
      </TouchableOpacity>
 */
