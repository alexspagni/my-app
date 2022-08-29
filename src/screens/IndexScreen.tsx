////////ALL IMPORT///////////////
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, BackHandler } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getImageMars } from "../api/getImage";
import PhotoComponent from "../components/PhotoComponent";
import {
  addElementsToLibrariesMars,
  addElementsToLibrariesMarsRefreshing,
  hideAllImages,
} from "../reducers/getImagesReducers";
import { dontShowImagesHide, imagesFilterHideImage } from "../filters/FIlters";
import {
  setLoadingReducer,
  setSearchReducer,
} from "../reducers/setLoadingReducer";
import { imageType, roverDataType } from "../type/differentType";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import {
  LIBRARIES_PAGE_NUMBER,
  LIBRARIES_ROVER_NAME,
} from "../reducers/DataReducer";
import { GravitazionalWave } from "../skeleton/GravitazionalWave";
import { SearchBar } from "../components/SearchBar";
import { FilterButtonComponent } from "../components/FIlterButtonComponent";
import { FooterComponent } from "../components/FooterComponent";

////////////COMPONENT////////////
/**
 * This component is the main component, is where every search for new images is made.
 *
 *
 */
const IndexScreen = () => {
  //////HOOKS+REF//////////////
  /**I need five hook to enable and disable different buttons, which are used to search and show different kind of images */
  const [allButtonColor, setAllButtonColor] = useState("#2E8AF6");
  const [dataButtonColor, setDataButtonColor] = useState("#727477");
  const [photosButtonColor, setPhotosButtonColor] = useState("#727477");
  const [hideAllButtonColor, setHideAllButtonColor] = useState("#727477");
  const [infoButtonColor, setInfoButtonColor] = useState("#727477");
  const [roverName, setRoverName] = useState<string>("");
  const flatListRef = React.createRef<FlatList>();
  const dispatch = useDispatch();
  //these five hooks are used to get every information from STORE.
  /*
   * images: get access to images, which will be shown on the mobile screen
   * hides:get acces to imagesHides, which won't be shown on the mobile screen
   * loading:get access to a boolean value, whose say if GravitazionalWave should be shown
   * search: get access to a value,whose say if a new search must be made
   * roverData:get access to all Value about roverImages-->date,pageNumber,roverName
   *
   */
  const images: imageType[] = useSelector((store: any) => store?.images);
  const hides = useSelector((store: any) => store?.imagesHide);
  const loading = useSelector((store: any) => store?.loading);
  const search = useSelector((store: any) => store?.search);
  const roverData: roverDataType = useSelector(
    (store: any) => store?.dataRover
  );
  /////////////////////////////////////////////////////////////////////////////////////
  //i need this useEffect to carry flatList at the beginning
  useEffect(
    React.useCallback(() => {
      if (
        images.filter((element) => {
          if (element.hide == false) {
            return element;
          }
        }).length
      ) {
        flatListRef.current?.scrollToIndex({
          animated: true,
          index: 0,
          viewPosition: 0,
        });
      }
    }, [search])
  ),
    [];
  //This function is used to add new images in the queue, it doesn't replace existing image
  const addImageFromMarsToList = async (
    roverName: string,
    page: number,
    day?: string,
    month?: string,
    year?: string
  ) => {
    try {
      //with this line of code i fetch images
      const results = await getImageMars(roverName, page, day, month, year);
      /*
       *the logic by which I do these things is why if "Photos Filter" is enable a user wants to see all images, so i show also hides images
       */
      if (photosButtonColor != "#2E8AF6") {
        const imagesToRender = imagesFilterHideImage(results, hides);
        dispatch(addElementsToLibrariesMars(imagesToRender));
      } else {
        //In this case a user doesn't want to see hides images, because "Photos filter "is not enable so i'm gonna show just images which are not hide
        const imagesToRender = results.map((element) => {
          return {
            image: element,
            hide: false,
          };
        });
        dispatch(addElementsToLibrariesMars(imagesToRender));
      }
    } catch {}
    //i need to set the new number page into the reducer
    dispatch({
      type: LIBRARIES_PAGE_NUMBER,
      payload: { ...roverData, page_number: page },
    });
    setTimeout(() => dispatch(setLoadingReducer(false)), 4000);
  };
  //This function is used to replace images every time a user makes a new search, so all previous images will be replace.
  const replaceImageFromMarsToList = async (
    roverName: string,
    page: number,
    day?: string,
    month?: string,
    year?: string
  ) => {
    try {
      const results = await getImageMars(roverName, page, day, month, year);
      if (photosButtonColor != "#2E8AF6") {
        const imagesToRender = imagesFilterHideImage(results, hides);
        dispatch(addElementsToLibrariesMarsRefreshing(imagesToRender));
      } else {
        const imagesToRender = results.map((element) => {
          return {
            image: element,
            hide: false,
          };
        });
        dispatch(addElementsToLibrariesMarsRefreshing(imagesToRender));
      }

      const ErrorMessage = () => {
        if (results.length == 0) {
          navigationContainerRef.current?.navigate("InfoScreenImageNotFound");
        }
      };

      setTimeout(() => dispatch(setLoadingReducer(false)), 4000);
      setTimeout(() => ErrorMessage(), 4000);
    } catch {}
    dispatch({
      type: LIBRARIES_PAGE_NUMBER,
      payload: { ...roverData, page_number: page },
    });
    setTimeout(() => setAllButtonColor("#727477"), 4000);
  };
  //I'm gonna make a new search every time "All button filter is pressed."
  useEffect(() => {
    if (allButtonColor === "#2E8AF6" && loading) {
      dispatch({
        type: LIBRARIES_PAGE_NUMBER,
        payload: { ...roverData, page_number: 1 },
      });
      //every time i enter into this "useEffect" is like i'm doing the first research, so i have to pass as pageNumber the first one.
      replaceImageFromMarsToList(
        roverData.rover_name,
        1,
        roverData.earth_day,
        roverData.earth_month,
        roverData.earth_year
      );
    }
  }, [search, allButtonColor]);

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.containerPrincipal}>
      <SearchBar
        term={roverName}
        onTermChange={(newRoverName) => {
          setRoverName(newRoverName);
        }}
        onEndEditing={() => {
          dispatch({
            type: LIBRARIES_ROVER_NAME,
            payload: { ...roverData, rover_name: roverName },
          });

          dispatch(setLoadingReducer(true));
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
            /**
             * the logic here is simple, if photos button is pressed, you need to show all'images refer to user previous search.
             * Otherwise you need to show just the image which are not hided
             */
            if (photosButtonColor == "#727477") {
              const newArray = images.map((element) => {
                return { image: element.image, hide: false };
              });
              dispatch(addElementsToLibrariesMarsRefreshing(newArray));
            } else {
              const newArray = dontShowImagesHide(images, hides);
              dispatch(addElementsToLibrariesMarsRefreshing(newArray));
            }
          }}
          buttonWidth={50}
          buttonHeight={34}
        />
        <FilterButtonComponent
          color={hideAllButtonColor}
          setColor={(newColor) => setHideAllButtonColor(newColor)}
          buttonName="Hide all"
          onPressButton={() => {
            /**
             * In order to hide all images, just map every image with the property hide=true
             * and make a dispatch in order to add all current image to imagesHide reducer
             */
            const newArray = images.map((element) => {
              return {
                image: element.image,
                hide: true,
              };
            });
            dispatch(addElementsToLibrariesMarsRefreshing(newArray));
            dispatch(hideAllImages(images));
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
      {loading && allButtonColor === "#2E8AF6" ? (
        <GravitazionalWave />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            style={styles.FlatListStyle}
            ref={flatListRef}
            data={images.filter((element) => {
              if (element.hide == false) {
                return element;
              }
            })}
            keyExtractor={(item) => item.image.id}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <PhotoComponent object={item.image} />
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
              /**
               * these lines of code will be executed just when a user will reach the end of the list
               */
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
            ListFooterComponent={
              images.filter((element) => {
                if (element.hide == false) {
                  return element;
                }
              }).length ? (
                <FooterComponent />
              ) : null
            }
          />
        </View>
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
