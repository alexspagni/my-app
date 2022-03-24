import React, { useEffect } from "react";
import { FlatList, View, StyleSheet, Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getImageMars } from "../api/getImage";
import { imagesFilter } from "../filters/FIlters";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import { LIBRARIES_PAGE_NUMBER } from "../reducers/DataReducer";
import { addElementsToLibrariesMarsRefreshing } from "../reducers/getImagesReducers";
import { setLoadingReducer } from "../reducers/setLoadingReducer";
import { roverDataType } from "../type/differentType";
export const ImagesLoading = () => {
  const animatedValue1 = React.useRef(new Animated.Value(0)).current;
  const roverData: roverDataType = useSelector(
    (store: any) => store?.dataRover
  );
  const dispatch = useDispatch();
  const hides = useSelector((store: any) => store?.imagesHide);
  const images = useSelector((store: any) => store?.images);
  const getImageFromMars = async (
    roverName: string,
    page: number,
    day?: string,
    month?: string,
    year?: string
  ) => {
    dispatch({
      type: LIBRARIES_PAGE_NUMBER,
      payload: { ...roverData, page_number: page },
    });
    try {
      const results = await getImageMars(roverName, page, day, month, year);
      const imagesToRender = imagesFilter(results, hides);
      dispatch(addElementsToLibrariesMarsRefreshing(imagesToRender));
    } catch {}
    dispatch(setLoadingReducer(false));
    navigationContainerRef.current?.navigate("drawer");
  };

  //ogni volta che viene premuto il pulsante di ricerca vado a fare una ricerca delle immagini

  useEffect(() => {
    setTimeout(
      () =>
        getImageFromMars(
          roverData.rover_name,
          roverData.page_number,
          roverData.earth_day,
          roverData.earth_month,
          roverData.earth_year
        ),
      8000
    );
  }, []);

  const transformX = animatedValue1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.4, 1, 0.4],
  });
  const animation = () => {
    Animated.timing(animatedValue1, {
      toValue: 1,
      duration: 2000,

      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    animation();

    const interval = setInterval(() => {
      animatedValue1.setValue(0);
      animation();
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.FlatListStyle}
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Animated.Image
              source={{ uri: item.img_src }}
              style={[
                styles.image,
                {
                  opacity: transformX,
                },
              ]}
            />
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: "center",
    flex: 1,
    backgroundColor: "#353839",
  },

  FlatListStyle: {
    paddingTop: 10,
  },
  image: {
    width: 300,
    height: 150,
    borderRadius: 4,
    opacity: 1,
  },
});
