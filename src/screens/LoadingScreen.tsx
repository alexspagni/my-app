import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";
import { ImageBackground, View, StyleSheet, Text } from "react-native";
import { ButtonComponent } from "../components/ButtonComponent";
import { imageType } from "../type/differentType";

export const LoadingScreen = () => {
  const navigation = useNavigation<any>();
  const images: imageType[] = useSelector((store: any) => store?.images);
  /**
   * this is the firt screen that user will see
   */
  const autoLogin = async () => {
    /**
     * When a user tap on the button at the end of the list i will see if there's a jwt token in
     * the cache of the phone. If there's the token, the user will be redirected to ImagesLoading screen otherwise he will
     * redirected to signIn screen in order to signin.
     */
    const token = await AsyncStorage.getItem("token");

    if (token) {
      if (images.length) {
        navigation.navigate("ImagesLoading");
      } else {
        navigation.navigate("MainStackNavigator");
      }
    } else {
      navigation.navigate("SigningStackNavigator");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/index.png")}
        style={styles.image}
        resizeMode="cover"
      >
        <Text style={styles.headerStyleSpace}>Space</Text>
        <Text style={styles.headerStyleExploration}>Exploration</Text>
        <View style={styles.innerContainer}>
          <Text style={styles.innerText}>
            Solo gli occhi aperti possono scoprire
          </Text>
          <Text style={styles.innerText}>
            che l'universo è il libro della più alta
          </Text>
          <Text style={styles.innerText}>Verità.</Text>
        </View>
        <View style={styles.ButtonView}>
          <ButtonComponent
            buttonColor="#2E8AF6"
            buttonName="Explore"
            buttonWidth={240}
            heightButton={44}
            onPressButton={() => autoLogin()}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  innerContainer: {
    position: "relative",
    left: 30,
    bottom: 200,
  },
  innerText: { color: "white" },

  headerStyleSpace: {
    position: "relative",
    bottom: 200,
    left: 30,
    fontSize: 45,
    fontWeight: "bold",
    color: "white",
  },
  headerStyleExploration: {
    position: "relative",
    bottom: 200,
    left: 30,
    fontSize: 45,
    color: "white",
    fontFamily: "sans-serif-light",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  ButtonView: {
    position: "relative",
    left: 60,
    top: 170,
  },
});
/*
  const getImageFromDeviceMemory = async () => {
    const result3 = await getStoredImagesHidedDevice();

    dispatch({
      type: "images_hide_all",
      payload: result3,
    });
  };
  useEffect(() => {
    try {
      getImageFromDeviceMemory();
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }, []);
  */
