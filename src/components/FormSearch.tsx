import React, { useState } from "react";
import { View, StyleSheet, Text, Button, Switch } from "react-native";
import { getImageMars } from "../api/getImage";
import { useDispatch, useSelector } from "react-redux";
import {
  addElementsToLibrariesMars,
  addElementsToLibrariesMarsRefreshing,
  addRoverName,
  incrementPageNumber,
  resetImages,
} from "../reducers/getImagesReducers";
import SearchImputText from "./SearchImputText";

import { useNavigation } from "@react-navigation/native";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import { imagesHided } from "../filters/FIlters";
import { setLoadingReducer } from "../reducers/setLoadingReducer";

const FormSearch: React.FC = () => {
  //hook per prendere la props "navigation"
  const navigation = useNavigation();
  //definisco i vari hook per andare a cambiare i vari valori dei textImput
  const [roverName, setRoverName] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [isEnabled, setIsEnabled] = useState(false);
  //vado a prelevare le immagini che non devo essere mostrate e quelle che risultanti dalla richiesta http alle api della nasa
  const images = useSelector((store: any) => store?.images);
  const hides = useSelector((store: any) => store?.imagesHide);
  const loading = useSelector((store: any) => store?.loading);
  const dispatch = useDispatch();

  const backToIndexScreen = () => {
    dispatch(addRoverName(roverName));
    dispatch(incrementPageNumber(1));
    dispatch(setLoadingReducer(true));
    dispatch({ type: "images_reset", payload: [] });
    //navigation.navigate("IndexScreen");
    navigationContainerRef.current?.navigate("IndexScreen");
  };
  const getImageFromMars = async () => {
    const pageNumber = 1;
    if (day && month && year) {
      const results = await getImageMars(
        roverName,
        pageNumber,
        day,
        month,
        year
      );
      const imagesToRender = imagesHided(results, hides);
      dispatch(addElementsToLibrariesMarsRefreshing(imagesToRender));
      dispatch(addRoverName(roverName));
      dispatch(incrementPageNumber(1));
      dispatch(setLoadingReducer(true));
    } else {
      const results = await getImageMars(roverName, pageNumber);
      const imagesToRender = imagesHided(results, hides);
      dispatch(addElementsToLibrariesMarsRefreshing(imagesToRender));
      dispatch(addRoverName(roverName));
      dispatch(incrementPageNumber(1));
      dispatch(setLoadingReducer(true));
    }
    navigation.goBack;
    navigation.navigate({ key: "IndexScreen", merge: true });
    //navigationContainerRef.current?.navigate("IndexScreen");
  };
  return (
    <View style={styles.backgroundStyle}>
      <Text style={styles.TextStyle}>Insert Rover Name</Text>
      <SearchImputText
        term={roverName}
        value="Insert rover Name"
        onChangeText={(newTerm) => setRoverName(newTerm)}
      />
      <Text style={styles.TextStyle}>Insert Year you want to search</Text>
      <View style={styles.ImputTextContainer}>
        <SearchImputText
          term={day}
          value="Insert day"
          onChangeText={(newTerm) => setDay(newTerm)}
        />
        <SearchImputText
          term={month}
          value="Insert month"
          onChangeText={(newTerm) => setMonth(newTerm)}
        />
        <SearchImputText
          term={year}
          value="Insert Year"
          onChangeText={(newTerm) => setYear(newTerm)}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.TextStyleSwicth}>Hide all current image:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#FFFFFF" : "#000000"}
          onValueChange={(newValue) => setIsEnabled(newValue)}
          onChange={() => console.log("toglle button")}
          value={isEnabled}
          style={styles.SwitchStle}
        />
      </View>
      <Button
        title="Search photo"
        onPress={() => {
          //if toggle button is enable==> hide all images
          if (isEnabled) {
            dispatch({
              type: "images_hide_all",
              payload: images,
            });
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
  switchContainer: {
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
