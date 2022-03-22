////////ALL IMPORT///////////////
import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getImageMars } from "../api/getImage";
import PhotoComponent from "../components/PhotoComponent";
import {
  addElementsToLibrariesMars,
  incrementPageNumber,
} from "../reducers/getImagesReducers";
import { imageNotFoundAlert } from "../alertMessages/alertMessage";
import { imagesFilter } from "../filters/FIlters";
import { SkeletonList } from "../skeleton/SkeletonList";
import { setLoadingReducer } from "../reducers/setLoadingReducer";
import { dateObject } from "../type/differentType";

////////////COMPONENT////////////
const IndexScreen = () => {
  //////HOOKS+REF//////////////
  const pageNumber = useSelector((store: any) => store?.pageNumber);
  const images = useSelector((store: any) => store?.images);
  const roverNameQueryng = useSelector((store: any) => store?.roverName);
  const roverDate: dateObject = useSelector((store: any) => store?.dateRover);
  const dispatch = useDispatch();
  const flatListRef = React.createRef<FlatList>();
  const hides = useSelector((store: any) => store?.imagesHide);
  const loading = useSelector((store: any) => store?.loading);
  const search = useSelector((store: any) => store?.search);

  //Gli unici parametri obbligatori sono quelli che riguardano il nome del rover e il numero di pagina da prendere, gli altri riguardanti l'anno sono opzionali
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
    dispatch(incrementPageNumber(page));
    try {
      const results = await getImageMars(roverName, page, day, month, year);
      const imagesToRender = imagesFilter(results, hides);
      dispatch(addElementsToLibrariesMars(imagesToRender));
    } catch {}
    setTimeout(() => dispatch(setLoadingReducer(false)), 1000);
  };
  //ogni volta che viene premuto il pulsante di ricerca vado a fare una ricerca delle immagini
  useEffect(() => {
    try {
      getImageFromMars(
        roverNameQueryng,
        pageNumber,
        roverDate.earth_day,
        roverDate.earth_month,
        roverDate.earth_year
      );
    } catch {}
  }, [search]);

  return (
    <View style={styles.containerPrincipal}>
      {images.length && !loading ? null : null}
      {!images.length && !loading ? imageNotFoundAlert() : null}
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
          const newPage = pageNumber + 1;
          getImageFromMars(
            roverNameQueryng,
            newPage,
            roverDate.earth_day,
            roverDate.earth_month,
            roverDate.earth_year
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
