import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { getImageMars } from "../api/getImage";
import { useDispatch, useSelector } from "react-redux";
import { NavigationProvider, withNavigation } from "react-navigation";
import {
  addElementsToLibrariesMars,
  addElementsToLibrariesMarsRefreshing,
  addRoverName,
  incrementPageNumber,
} from "../reducers/getImagesReducers";
import SearchImputText from "./SearchImputText";

import { useNavigation } from "@react-navigation/native";

const FormSearch: React.FC = () => {
  //hook per prendere la props "navigation"
  const navigation = useNavigation();
  //definisco i vari hook per andare a cambiare i vari valori dei textImput
  const [roverName, setRoverName] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  //vado a prelevare le immagini che non devo essere mostrate e quelle che risultanti dalla richiesta http alle api della nasa
  const images = useSelector((store: any) => store?.images);
  const hides = useSelector((store: any) => store?.imagesHide);
  const dispatch = useDispatch();

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
      //Una volta ottenuto l'array di immagini mars object vado a filtrarlo in modo che non vengano mostrate le immagini che sono state nascoste
      const imageFilter = results.filter((element) => {
        let temp = 0;
        for (let i = 0; i < hides.length; i++) {
          if (element.id == hides[i].id) {
            temp = 1;
          }
        }
        if (temp == 0) {
          return element;
        }
      });
      dispatch(addElementsToLibrariesMarsRefreshing(imageFilter));
      dispatch(addRoverName(roverName));
    } else {
      const results = await getImageMars(roverName, pageNumber);
      //Una volta ottenuto l'array di immagini mars object vado a filtrarlo in modo che non vengano mostrate le immagini che sono state nascoste
      const imageFilter = results.filter((element) => {
        let temp = 0;
        for (let i = 0; i < hides.length; i++) {
          if (element.id == hides[i].id) {
            temp = 1;
          }
        }
        if (temp == 0) {
          return element;
        }
      });
      dispatch(addElementsToLibrariesMarsRefreshing(imageFilter));
      dispatch(addRoverName(roverName));
      dispatch(incrementPageNumber(1));
    }
    navigation.goBack();
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
      <Button title="Search photo" onPress={() => getImageFromMars()} />
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
});
export default FormSearch;
