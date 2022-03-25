////////ALL IMPORT///////////////
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getImageMars } from "../api/getImage";
import PhotoComponent from "../components/PhotoComponent";
import { addElementsToLibrariesMars } from "../reducers/getImagesReducers";
import { imagesFilter } from "../filters/FIlters";
import { setLoadingReducer } from "../reducers/setLoadingReducer";
import { roverDataType } from "../type/differentType";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import { LIBRARIES_PAGE_NUMBER } from "../reducers/DataReducer";
import { GravitazionalWave } from "../skeleton/GravitazionalWave";
import { SearchBar } from "../components/SearchBar";
import { FilterButtonComponent } from "../components/FIlterButtonComponent";
////////////COMPONENT////////////
const IndexScreen = () => {
  //////HOOKS+REF//////////////
  const [roverName, setRoverName] = useState<string>("");
  const images = useSelector((store: any) => store?.images);
  const dispatch = useDispatch();
  const flatListRef = React.createRef<FlatList>();
  const hides = useSelector((store: any) => store?.imagesHide);
  const loading = useSelector((store: any) => store?.loading);
  const search = useSelector((store: any) => store?.search);
  const roverData: roverDataType = useSelector(
    (store: any) => store?.dataRover
  );
  const updateSearch = (newRoverName: string) => {
    setRoverName(newRoverName);
  };
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
    console.log("sono qui");

    try {
      const results = await getImageMars(roverName, page, day, month, year);
      const imagesToRender = imagesFilter(results, hides);
      dispatch(addElementsToLibrariesMars(imagesToRender));
    } catch {}
    dispatch({
      type: LIBRARIES_PAGE_NUMBER,
      payload: { ...roverData, page_number: page },
    });
    setTimeout(() => dispatch(setLoadingReducer(false)), 4000);
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
      <SearchBar
        term={roverName}
        onTermChange={(newRoverName) => setRoverName(newRoverName)}
      />
      <View style={styles.listButtonStyle}>
        <FilterButtonComponent
          buttonName="All"
          onPressButton={() => console.log("fdafasdfsda")}
          buttonWidth={40}
          buttonHeight={34}
        />
        <FilterButtonComponent
          buttonName="Data"
          onPressButton={() =>
            navigationContainerRef.current?.navigate("Search")
          }
          buttonWidth={45}
          buttonHeight={34}
        />
        <FilterButtonComponent
          buttonName="Photos"
          onPressButton={() => console.log()}
          buttonWidth={50}
          buttonHeight={34}
        />
        <FilterButtonComponent
          buttonName="Hide all"
          onPressButton={() => console.log()}
          buttonWidth={60}
          buttonHeight={34}
        />
        <FilterButtonComponent
          buttonName="Info"
          onPressButton={() =>
            navigationContainerRef.current?.navigate("InfoScreenHome")
          }
          buttonWidth={50}
          buttonHeight={34}
        />
      </View>
      {images.length && !loading ? null : null}
      {!images.length && !loading
        ? navigationContainerRef.current?.navigate("InfoScreenImageNotFound")
        : null}
      {loading ? (
        <GravitazionalWave />
      ) : (
        <FlatList
          style={styles.FlatListStyle}
          ref={flatListRef}
          data={imagesFilter(images, hides)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <PhotoComponent object={item} />
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
      )}
    </View>
  );
};
//Style del componente
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: "center",
    marginRight: 15,
  },
  containerPrincipal: {
    backgroundColor: "#181A1C",
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
  listButtonStyle: {
    flexDirection: "row",
    marginHorizontal: 18,
    marginTop: 11,
    marginBottom: 20,
  },
});

export default IndexScreen;
