import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { hideImageAlert } from "../alertMessages/alertMessage";
type IndexScreenType = {
  navigation: any;
};
const ShowScreen: React.FC<IndexScreenType> = () => {
  const hides = useSelector((store: any) => store?.imagesHide);
  const route = useRoute();
  //Hook per andare a prendere il parametro che mi è stato passato da IndexScreen
  const image = (route.params as any)?.image;
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Image source={{ uri: image.img_src }} style={styles.image} />
      <Text style={styles.TextStyleTitle}>
        Image ID:{<Text style={styles.TextStyleInnerText}> {image?.id}</Text>}
      </Text>
      <Text style={styles.TextStyleTitle}>
        Rover_Name:
        {<Text style={styles.TextStyleInnerText}> {image?.rover.name}</Text>}
      </Text>
      <Text style={styles.TextStyleTitle}>
        Camera_Name:
        {<Text style={styles.TextStyleInnerText}> {image?.camera.name}</Text>}
      </Text>
      {hides.includes(image) ? (
        <Text style={styles.TextStyleInnerText}>This image has been hided</Text>
      ) : null}
      <Button
        title="Hide this image"
        buttonStyle={{
          backgroundColor: "white",
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 30,
        }}
        containerStyle={{
          width: 300,
          marginVertical: 20,
        }}
        titleStyle={{ fontWeight: "bold", color: "black" }}
        onPress={() => {
          dispatch({
            type: "images_hide_one",
            payload: image,
          });
          hideImageAlert();
        }}
        disabled={!hides.includes(image) ? false : true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#353839",
    flex: 1,
    paddingLeft: 20,
  },
  TextStyleTitle: {
    color: "green",
    fontSize: 18,
  },
  TextStyleInnerText: {
    color: "white",
    fontSize: 18,
  },
  image: {
    marginTop: 10,
    width: 300,
    height: 200,
    borderRadius: 4,
  },
});
export default ShowScreen;
