////////ALL IMPORT///////////////
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getImageMars } from "../api/getImage";
import PhotoComponent from "../components/PhotoComponent";
import {
  addElementsToLibrariesMars,
  addElementsToLibrariesMarsRefreshing,
  resetImagesHide,
} from "../reducers/getImagesReducers";
import { imagesFilter } from "../filters/FIlters";
import {
  setLoadingReducer,
  setSearchReducer,
} from "../reducers/setLoadingReducer";
import { roverDataType } from "../type/differentType";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import {
  LIBRARIES_PAGE_NUMBER,
  LIBRARIES_ROVER_NAME,
} from "../reducers/DataReducer";
import { GravitazionalWave } from "../skeleton/GravitazionalWave";
import { SearchBar } from "../components/SearchBar";
import { FilterButtonComponent } from "../components/FIlterButtonComponent";

////////////COMPONENT////////////
const IndexScreen = () => {
  //////HOOKS+REF//////////////
  const [allButtonColor, setAllButtonColor] = useState("#2E8AF6");
  const [dataButtonColor, setDataButtonColor] = useState("#727477");
  const [photosButtonColor, setPhotosButtonColor] = useState("#727477");
  const [hideAllButtonColor, setHideAllButtonColor] = useState("#727477");
  const [infoButtonColor, setInfoButtonColor] = useState("#727477");

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
  const addImageFromMarsToList = async (
    roverName: string,
    page: number,
    day?: string,
    month?: string,
    year?: string
  ) => {
    console.log(roverName, page, day, month, year);

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
  const replaceImageFromMarsToList = async (
    roverName: string,
    page: number,
    day?: string,
    month?: string,
    year?: string
  ) => {
    console.log(roverName, page, day, month, year);
    try {
      const results = await getImageMars(roverName, page, day, month, year);
      const imagesToRender = imagesFilter(results, hides);
      const ErrorMessage = () => {
        if (imagesToRender.length == 0) {
          navigationContainerRef.current?.navigate("InfoScreenImageNotFound");
        }
      };
      dispatch(addElementsToLibrariesMarsRefreshing(imagesToRender));
      setTimeout(() => ErrorMessage(), 4000);
      setTimeout(() => dispatch(setLoadingReducer(false)), 4000);
    } catch {}
    dispatch({
      type: LIBRARIES_PAGE_NUMBER,
      payload: { ...roverData, page_number: page },
    });
  };
  //ogni volta che viene premuto il pulsante di ricerca vado a fare una ricerca delle immagini
  useEffect(() => {
    if (allButtonColor === "#2E8AF6") {
      //console.log("sono quì");
      dispatch({
        type: LIBRARIES_PAGE_NUMBER,
        payload: { ...roverData, page_number: 1 },
      });
      dispatch(setLoadingReducer(true));
      replaceImageFromMarsToList(
        roverData.rover_name,
        1,
        roverData.earth_day,
        roverData.earth_month,
        roverData.earth_year
      );
    }
    /*
    if (!images.length) {
      getImageFromMars(
        roverData.rover_name,
        roverData.page_number,
        roverData.earth_day,
        roverData.earth_month,
        roverData.earth_year
      );
    } else {
      // setTimeout(() => dispatch(setLoadingReducer(false)), 4000);
    }
    */
  }, [search, allButtonColor]);
  return (
    <View style={styles.containerPrincipal}>
      <SearchBar
        term={roverName}
        onTermChange={(newRoverName) => {
          setRoverName(newRoverName);
        }}
        onEndEditing={() => {
          //console.log(roverName);

          dispatch({
            type: LIBRARIES_ROVER_NAME,
            payload: { ...roverData, rover_name: roverName },
          });
          dispatch(setSearchReducer(!search));
        }}
      />
      <View style={styles.listButtonStyle}>
        <FilterButtonComponent
          color={allButtonColor}
          setColor={(newColor) => setAllButtonColor(newColor)}
          buttonName="All"
          onPressButton={() => console.log("")}
          buttonWidth={40}
          buttonHeight={34}
        />
        <FilterButtonComponent
          color={dataButtonColor}
          setColor={(newColor) => setDataButtonColor(newColor)}
          buttonName="Data"
          onPressButton={() => {
            navigationContainerRef.current?.navigate("Search");
            setDataButtonColor("#727477");
          }}
          buttonWidth={45}
          buttonHeight={34}
        />
        <FilterButtonComponent
          color={photosButtonColor}
          setColor={(newColor) => setPhotosButtonColor(newColor)}
          buttonName="Photos"
          onPressButton={() => {
            dispatch(resetImagesHide([]));
             dispatch(setSearchReducer(!search));
            setPhotosButtonColor("#727477");
          }}
          buttonWidth={50}
          buttonHeight={34}
        />
        <FilterButtonComponent
          color={hideAllButtonColor}
          setColor={(newColor) => setHideAllButtonColor(newColor)}
          buttonName="Hide all"
          onPressButton={() => {
            dispatch({ type: "images_hide_all", payload: images });
            //  dispatch(setSearchReducer(!search));
            setHideAllButtonColor("#727477");
          }}
          buttonWidth={60}
          buttonHeight={34}
        />
        <FilterButtonComponent
          color={infoButtonColor}
          setColor={(newColor) => setInfoButtonColor(newColor)}
          buttonName="Info"
          onPressButton={() => {
            navigationContainerRef.current?.navigate("InfoScreenHome");
            setInfoButtonColor("#727477");
          }}
          buttonWidth={50}
          buttonHeight={34}
        />
      </View>
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
            // console.log(newPage);

            addImageFromMarsToList(
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
