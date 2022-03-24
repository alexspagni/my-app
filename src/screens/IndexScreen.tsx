////////ALL IMPORT///////////////
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getImageMars } from "../api/getImage";
import PhotoComponent from "../components/PhotoComponent";
import { addElementsToLibrariesMars } from "../reducers/getImagesReducers";
import { getTokenFromStore, imagesFilter } from "../filters/FIlters";
import { SkeletonList } from "../skeleton/SkeletonList";
import { setLoadingReducer } from "../reducers/setLoadingReducer";
import { roverDataType } from "../type/differentType";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import { LIBRARIES_PAGE_NUMBER } from "../reducers/DataReducer";

////////////COMPONENT////////////
const IndexScreen = () => {
  //////HOOKS+REF//////////////
  const images = useSelector((store: any) => store?.images);
  const dispatch = useDispatch();
  const flatListRef = React.createRef<FlatList>();
  const hides = useSelector((store: any) => store?.imagesHide);
  const loading = useSelector((store: any) => store?.loading);
  const search = useSelector((store: any) => store?.search);
  const roverData: roverDataType = useSelector(
    (store: any) => store?.dataRover
  );

  useEffect(
    React.useCallback(() => {
      if (images.length) {
        flatListRef.current?.scrollToIndex({
          animated: true,
          index: 0,
          viewPosition: 0,
        });
      }
    }, [search])
  ),
    [];
  const getImageFromMars = async (
    roverName: string,
    page: number,
    day?: string,
    month?: string,
    year?: string
  ) => {
    console.log("sono qui");

    try {
      const results = await getImageMars(roverName, page, day, month, year);
      console.log(results);

      const imagesToRender = imagesFilter(results, hides);
      console.log(imagesToRender);

      dispatch(addElementsToLibrariesMars(imagesToRender));
    } catch {}
    dispatch({
      type: LIBRARIES_PAGE_NUMBER,
      payload: { ...roverData, page_number: page },
    });
    setTimeout(() => dispatch(setLoadingReducer(false)), 2000);
  };
  //ogni volta che viene premuto il pulsante di ricerca vado a fare una ricerca delle immagini
  useEffect(() => {
    if (!images.length) {
      getImageFromMars(
        roverData.rover_name,
        roverData.page_number,
        roverData.earth_day,
        roverData.earth_month,
        roverData.earth_year
      );
    } else {
      setTimeout(() => dispatch(setLoadingReducer(false)), 2000);
    }
  }, [search]);

  return (
    <View style={styles.containerPrincipal}>
      {images.length && !loading ? null : null}
      {!images.length && !loading
        ? navigationContainerRef.current?.navigate("InfoScreenImageNotFound")
        : null}
      {loading ? <SkeletonList /> : null}
      <FlatList
        style={styles.FlatListStyle}
        ref={flatListRef}
        data={imagesFilter(images, hides)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <PhotoComponent object={item} />
          </View>
        )}
        onEndReached={() => {
          const newPage = roverData.page_number + 1;
          console.log(newPage);

          getImageFromMars(
            roverData.rover_name,
            newPage,
            roverData.earth_day,
            roverData.earth_month,
            roverData.earth_year
          );
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};
//Style del componente
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15,
  },
  containerPrincipal: {
    backgroundColor: "#353839",
    flex: 1,
  },
  TextStyle: {
    color: "white",
    fontSize: 16,
  },
  checkbox: {
    margin: 8,
  },
  icon: {
    fontSize: 24,
    color: "white",
    paddingLeft: 10,
  },
  imageHeader: {
    width: 200,
    height: 200,
    borderRadius: 4,
  },
  FlatListStyle: {
    paddingTop: 10,
  },
});

export default IndexScreen;
