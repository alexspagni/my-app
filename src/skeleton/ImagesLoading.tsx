import React, { useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getImageMars } from "../api/getImage";
import PhotoComponent from "../components/PhotoComponent";
import { imagesFilter } from "../filters/FIlters";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import {
  addElementsToLibrariesMarsRefreshing,
  incrementPageNumber,
} from "../reducers/getImagesReducers";
import { setLoadingReducer } from "../reducers/setLoadingReducer";
import { dateObject } from "../type/differentType";
export const ImagesLoading = () => {
  const pageNumber = useSelector((store: any) => store?.pageNumber);
  const roverNameQueryng = useSelector((store: any) => store?.roverName);
  const roverDate: dateObject = useSelector((store: any) => store?.dateRover);
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
    dispatch(incrementPageNumber(page));
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
          roverNameQueryng,
          pageNumber,
          roverDate.earth_day,
          roverDate.earth_month,
          roverDate.earth_year
        ),
      8000
    );
  }, []);

  return (
    <View>
      <FlatList
        style={styles.FlatListStyle}
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <PhotoComponent object={item} />
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
    flexDirection: "row",
    paddingLeft: 15,
  },
  FlatListStyle: {
    paddingTop: 10,
  },
});
