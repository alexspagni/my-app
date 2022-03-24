import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-elements";
import { resetImagesHide } from "../reducers/getImagesReducers";
import SearchImputText from "./SearchImputText";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import {
  setLoadingReducer,
  setSearchReducer,
} from "../reducers/setLoadingReducer";
import { SwitchButton } from "./SwitchButton";
import { roverDataType } from "../type/differentType";
import {
  LIBRARIES_DATE,
  LIBRARIES_PAGE_NUMBER,
  LIBRARIES_ROVER_NAME,
} from "../reducers/DataReducer";

const FormSearch: React.FC = () => {
  //definisco i vari hook per andare a cambiare i vari valori dei textImput
  const [roverName, setRoverName] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [isEnabledHideAllImages, setIsEnabledHideAllImages] = useState(false);
  const [isEnabledRestoreImagesHided, setIsEnableRestoreImagesHided] =
    useState(false);

  const roverData: roverDataType = useSelector(
    (store: any) => store?.dataRover
  );
  //vado a prelevare le immagini che non devo essere mostrate e quelle che risultanti dalla richiesta http alle api della nasa
  const images = useSelector((store: any) => store?.images);
  const search = useSelector((store: any) => store?.search);
  const dispatch = useDispatch();

  const backToIndexScreen = () => {
    dispatch({
      type: LIBRARIES_PAGE_NUMBER,
      payload: { ...roverData, page_number: 1 },
    });
    dispatch({
      type: LIBRARIES_ROVER_NAME,
      payload: { ...roverData, rover_name: roverName },
    });
    dispatch(setLoadingReducer(true));
    dispatch(setSearchReducer(!search));
    dispatch({
      type: LIBRARIES_DATE,
      payload: {
        ...roverData,
        earth_day: day,
        earth_month: month,
        earth_year: year,
      },
    });
    dispatch({ type: "images_reset", payload: [] });
    //navigation.navigate("IndexScreen");
    navigationContainerRef.current?.navigate("IndexScreen");
  };

  return (
    <View style={styles.backgroundStyle}>
      <Text style={styles.TextStyle}>Insert Rover Name</Text>
      <SearchImputText
        term={roverName}
        value="Insert rover Name"
        onChangeText={(newTerm) => setRoverName(newTerm.trim())}
      />
      <Text style={styles.TextStyle}>
        Insert Day-Month-Year you want to search by
      </Text>
      <View style={styles.ImputTextContainer}>
        <SearchImputText
          term={day}
          value="Insert day"
          onChangeText={(newTerm) => setDay(newTerm.trim())}
        />
        <SearchImputText
          term={month}
          value="Insert month"
          onChangeText={(newTerm) => setMonth(newTerm.trim())}
        />
        <SearchImputText
          term={year}
          value="Insert Year"
          onChangeText={(newTerm) => setYear(newTerm.trim())}
        />
      </View>

      <View style={styles.switchContainerImagesHide}>
        <SwitchButton
          valueText="Hide all current images"
          isEnabled={isEnabledHideAllImages}
          setIsEnabled={(newValue: boolean) => {
            setIsEnableRestoreImagesHided(false);
            setIsEnabledHideAllImages(newValue);
          }}
        />
      </View>
      <View style={styles.switchContainerImagesRestore}>
        <SwitchButton
          valueText="Restore Images hided"
          isEnabled={isEnabledRestoreImagesHided}
          setIsEnabled={(newValue: boolean) => {
            setIsEnableRestoreImagesHided(newValue);
            setIsEnabledHideAllImages(false);
          }}
        />
      </View>
      <Button
        title="Search photo"
        buttonStyle={{
          backgroundColor: "black",
          borderWidth: 2,
          borderColor: "black",
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginVertical: 20,
          marginLeft: 62,
        }}
        titleStyle={{ fontWeight: "bold", color: "white" }}
        onPress={() => {
          //if toggle button is enable==> hide all images
          if (isEnabledHideAllImages) {
            dispatch({
              type: "images_hide_all",
              payload: images,
            });
          }
          if (isEnabledRestoreImagesHided) {
            dispatch(resetImagesHide([]));
          }
          //then go back to the index screen

          backToIndexScreen();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    borderColor: "black",
    borderWidth: 4,
    marginHorizontal: 10,
    height: 600,
  },
  TextStyle: {
    alignItems: "center",
  },
  ImputTextContainer: {
    flexDirection: "row",
  },
  switchContainerImagesHide: {
    marginTop: 10,
    flexDirection: "row",
  },
  switchContainerImagesRestore: {
    marginTop: 10,
    marginBottom: 25,
    flexDirection: "row",
  },
  TextStyleSwicth: {
    paddingRight: 15,
    paddingBottom: 15,
  },
  SwitchStle: {
    position: "absolute",

    right: 120,
    bottom: 1,
  },
});
export default FormSearch;
