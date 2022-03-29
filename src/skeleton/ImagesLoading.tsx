import React, { useEffect } from "react";
import { FlatList, View, StyleSheet, Animated, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getImageMars } from "../api/getImage";
import { imagesFilter, imagesFilterHideImage } from "../filters/FIlters";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import { LIBRARIES_PAGE_NUMBER } from "../reducers/DataReducer";
import { addElementsToLibrariesMarsRefreshing } from "../reducers/getImagesReducers";
import { setLoadingReducer } from "../reducers/setLoadingReducer";
import { imageType, roverDataType } from "../type/differentType";
export const ImagesLoading = () => {
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
    navigationContainerRef.current?.navigate("drawer");
  };

  //ogni volta che viene premuto il pulsante di ricerca vado a fare una ricerca delle immagini

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
