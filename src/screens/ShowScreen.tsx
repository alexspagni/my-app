import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { hideImageAlert } from "../alertMessages/alertMessage";
import { ButtonComponent } from "../components/ButtonComponent";
import { hideAnImage, imagesFilterHideImage } from "../filters/FIlters";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import { addElementsToLibrariesMarsRefreshing } from "../reducers/getImagesReducers";
import { imageType, marsObject } from "../type/differentType";
type IndexScreenType = {
  navigation: any;
};
const lookImageHide = (hides: marsObject[], item: marsObject) => {
  for (let i = 0; i < hides.length; i++) {
    if (hides[i].id === item.id) {
      return true;
    }
  }
  return false;
};
const ShowScreen: React.FC<IndexScreenType> = () => {
  const hides = useSelector((store: any) => store?.imagesHide);
  const route = useRoute();
  const images: imageType[] = useSelector((store: any) => store?.images);

  //Hook per andare a prendere il parametro che mi è stato passato da IndexScreen
  const image1: marsObject = (route.params as any)?.image;
  console.log(image1);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Image source={{ uri: image1.img_src }} style={styles.image} />
      <Pressable
        style={styles.iconStyle}
        onPress={() => navigationContainerRef.current?.navigate("IndexScreen")}
      >
        <Image source={require("../Images/iconX.png")} />
      </Pressable>
      <View style={styles.principalContainer}>
        <View style={{ marginTop: 30, marginLeft: 25 }}>
          <Text style={styles.TextStyleTitle}>
            Image ID:
            {<Text style={styles.TextStyleInnerText}> {image1?.id}</Text>}
          </Text>
          <Text style={styles.TextStyleTitle}>
            Rover_Name:
            {
              <Text style={styles.TextStyleInnerText}>
                {image1?.rover.name}
              </Text>
            }
          </Text>
          <Text style={styles.TextStyleTitle}>
            Camera_Name:
            {
              <Text style={styles.TextStyleInnerText}>
                {image1?.camera.name}
              </Text>
            }
          </Text>
          {lookImageHide(hides, image1) ? (
            <Text style={styles.TextStyleInnerText}>
              This image has been hided
            </Text>
          ) : (
            <View style={styles.ButtonViewStyle}>
              <ButtonComponent
                buttonName="Hide this image"
                buttonColor="#2E8AF6"
                buttonWidth={300}
                heightButton={44}
                onPressButton={() => {
                  //console.log(images);

                  const newImageArray = hideAnImage(images, image1);
                  //console.log(newImageArray);
                  dispatch({
                    type: "images_hide_one",
                    payload: image1,
                  });
                  dispatch(addElementsToLibrariesMarsRefreshing(newImageArray));
                  hideImageAlert();
                }}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    position: "relative",
    bottom: 250,
    left: 15,
  },
  container: {
    backgroundColor: "#353839",
    flex: 1,
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
    width: 360,
    height: 280,
    borderRadius: 4,
  },
  ButtonViewStyle: {
    marginTop: 30,
  },
  principalContainer: {
    position: "relative",
    bottom: 60,
    height: 500,
    borderRadius: 35,
    backgroundColor: "#181A1C",
  },
});
export default ShowScreen;

/**<Button
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
      /> */
/*

      */
