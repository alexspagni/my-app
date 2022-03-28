import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Button, colors } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { hideImageAlert } from "../alertMessages/alertMessage";
import { ButtonComponent } from "../components/ButtonComponent";
import { navigationContainerRef } from "../Navigator/ContainerRef";
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
            {<Text style={styles.TextStyleInnerText}> {image?.id}</Text>}
          </Text>
          <Text style={styles.TextStyleTitle}>
            Rover_Name:
            {
              <Text style={styles.TextStyleInnerText}>
                {" "}
                {image?.rover.name}
              </Text>
            }
          </Text>
          <Text style={styles.TextStyleTitle}>
            Camera_Name:
            {
              <Text style={styles.TextStyleInnerText}>
                {" "}
                {image?.camera.name}
              </Text>
            }
          </Text>
          {hides.includes(image) ? (
            <Text style={styles.TextStyleInnerText}>
              This image has been hided
            </Text>
          ) : null}
          <View style={styles.ButtonViewStyle}>
            <ButtonComponent
              buttonName="Hide this image"
              buttonColor="#2E8AF6"
              buttonWidth={300}
              heightButton={44}
              onPressButton={() => {
                dispatch({
                  type: "images_hide_one",
                  payload: image,
                });
                hideImageAlert();
              }}
            />
          </View>
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
