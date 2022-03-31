import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  BackHandler,
  PanResponder,
  Animated,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { hideImageAlert } from "../alertMessages/alertMessage";
import { ButtonComponent } from "../components/ButtonComponent";
import { hideAnImage } from "../filters/FIlters";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import { addElementsToLibrariesMarsRefreshing } from "../reducers/getImagesReducers";
import { imageType, marsObject } from "../type/differentType";
/**
 * This Screen is used to show some images detail about an image.
 * In order to show this details i need to get access to a "marsObject" object which is shared
 * by "PhotoComponent" component.
 */

//Function used to see if an image is hided or not.
const lookImageHide = (hides: marsObject[], item: marsObject) => {
  for (let i = 0; i < hides.length; i++) {
    if (hides[i].id === item.id) {
      return true;
    }
  }
  return false;
};
const ShowScreen: React.FC = () => {
  const navigator = useNavigation<any>();

  const pan = useRef(new Animated.ValueXY()).current;
  const hides = useSelector((store: any) => store?.imagesHide);
  //hook to get access to paramater passed from another screen.
  const route = useRoute();
  const images: imageType[] = useSelector((store: any) => store?.images);
  //Code used to get acces to the parameter shared by PhotoComponent component

  const image1: marsObject = (route.params as any)?.image;

  const dispatch = useDispatch();
  useEffect(() => {
    const backAction = () => {
      navigationContainerRef.current?.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const getNextImage = (imageToCompare: marsObject) => {
    const index = images.findIndex((element) => element.image.id == image1.id);
    if (index != images.length - 1) {
      return images[index + 1].image;
    } else {
      return images[0].image;
    }
  };

  const getPreviousImage = (image1: marsObject) => {
    const index = images.findIndex((element) => element.image.id == image1.id);
    // console.log(index);

    if (index != 0) {
      return images[index - 1].image;
    } else {
      return images[images.length - 1].image;
    }
  };
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },

      onPanResponderRelease: (evt, gestureState) => {
        // console.log(gestureState.x0);
        pan.flattenOffset();
        if (gestureState.dx < -100) {
          navigator.replace("ShowScreen", {
            image: getNextImage(image1),
            slide: "left",
          });
        }
        if (gestureState.dx > 100) {
          navigator.replace("ShowScreen", {
            image: getPreviousImage(image1),
            slide: "right",
          });
        }
      },
    })
  ).current;
  return (
    <View style={styles.container}>
      <Animated.View {...panResponder.panHandlers}>
        <Image source={{ uri: image1.img_src }} style={styles.image} />
      </Animated.View>
      <Pressable
        style={styles.iconStyle}
        onPress={() => navigationContainerRef.current?.goBack()}
      >
        <Image source={require("../../assets/iconX.png")} />
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
          {
            /**
             * If user is going to watch some detail about an image which is been hided, i show
             * a text message to say that the image is hided, otherwise i give the possibility to the
             * user to hide the image.
             */
            lookImageHide(hides, image1) ? (
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
                    const newImageArray = hideAnImage(images, image1);
                    dispatch({
                      type: "images_hide_one",
                      payload: image1,
                    });
                    dispatch(
                      addElementsToLibrariesMarsRefreshing(newImageArray)
                    );
                    hideImageAlert();
                  }}
                />
              </View>
            )
          }
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
    fontFamily: "serif",
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
