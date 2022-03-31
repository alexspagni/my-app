import React, { useEffect } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Animated,
  Text,
  Alert,
  BackHandler,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getImageMars } from "../api/getImage";
import { imagesFilterHideImage } from "../filters/FIlters";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import { LIBRARIES_PAGE_NUMBER } from "../reducers/DataReducer";
import { addElementsToLibrariesMarsRefreshing } from "../reducers/getImagesReducers";
import { setLoadingReducer } from "../reducers/setLoadingReducer";
import { imageType, roverDataType } from "../type/differentType";
/**
 * This screen is used, just to show some images which are cached on the user's phone.
 * I also make a mew search for some images, in order to show them on the screen, in the next
 * screen. The logic used to search new image is the same used in the Index Screen
 */
export const ImagesLoading = ({ navigation }: any) => {
  const animatedValue1 = React.useRef(new Animated.Value(0)).current;
  const roverData: roverDataType = useSelector(
    (store: any) => store?.dataRover
  );
  const dispatch = useDispatch();
  const hides = useSelector((store: any) => store?.imagesHide);
  const images: imageType[] = useSelector((store: any) => store?.images);
  const getImageFromMars = async (
    roverName: string,
    page: number,
    day?: string,
    month?: string,
    year?: string
  ) => {
    try {
      const results = await getImageMars(roverName, page, day, month, year);
      const imagesToRender = imagesFilterHideImage(results, hides);
      dispatch(addElementsToLibrariesMarsRefreshing(imagesToRender));
    } catch {}
    dispatch(setLoadingReducer(false));
    navigationContainerRef.current?.navigate("MainStackNavigator");
  };
  useEffect(() => {
    const backAction = () => {
      console.log("Button press");

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    dispatch({
      type: LIBRARIES_PAGE_NUMBER,
      payload: { ...roverData, page_number: 1 },
    });
    setTimeout(
      () =>
        getImageFromMars(
          roverData.rover_name,
          1,
          roverData.earth_day,
          roverData.earth_month,
          roverData.earth_year
        ),
      3000
    );
  }, []);

  const transformX = animatedValue1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.6, 1, 0.6],
  });
  const animation = () => {
    Animated.timing(animatedValue1, {
      toValue: 1,
      duration: 2500,

      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    animation();

    const interval = setInterval(() => {
      animatedValue1.setValue(0);
      animation();
    }, 2500);

    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={images.filter((element) => {
          if (element.hide == false) {
            return element;
          }
        })}
        keyExtractor={(item) => item.image.id}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Animated.Image
              source={{ uri: item.image.img_src }}
              style={[
                styles.image,
                {
                  opacity: transformX,
                },
              ]}
            />
            <Text style={styles.textStyle}>Cached Images</Text>
            <View
              style={{
                marginTop: 10,
                borderBottomColor: "#323436",
                borderBottomWidth: 2,
                width: 360,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181A1C",

    paddingTop: 20,
  },

  image: {
    marginLeft: 25,
    width: 300,
    height: 150,
    borderRadius: 4,
    opacity: 1,
  },
  textStyle: {
    position: "relative",
    left: 25,
    color: "white",
    fontSize: 16,
  },
});
