import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
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
import { ButtonComponent } from "./ButtonComponent";

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
    dispatch(setLoadingReducer(true));
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
      <TouchableOpacity
        style={styles.imageStyle}
        onPress={() => navigationContainerRef.current?.navigate("IndexScreen")}
      >
        <Image source={require("../Images/iconX.png")} />
      </TouchableOpacity>
      <Text style={styles.TextStyle}>Date Filter</Text>
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
      <View style={styles.ButtonView}>
        <ButtonComponent
          buttonColor="#2E8AF6"
          buttonName="Sign up"
          buttonWidth={230}
          onPressButton={() => {
            dispatch({
              type: LIBRARIES_DATE,
              payload: {
                ...roverData,
                earth_day: day,
                earth_month: month,
                earth_year: year,
              },
            });
            dispatch(setSearchReducer(!search));
            navigationContainerRef.current?.navigate("drawer");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#181A1C",
    marginTop: 30,
    flex: 1,
  },
  TextStyle: {
    alignItems: "center",
    color: "white",
    marginTop: 180,
    fontSize: 25,
    marginLeft: 30,
    marginBottom: 15,
  },
  ImputTextContainer: {
    flexDirection: "row",
  },
  imageStyle: {
    position: "relative",
    left: 20,
    top: 20,
    width: 50,
    height: 40,
  },
  ButtonView: {
    marginTop: 15,
    marginLeft: 60,
  },
});
export default FormSearch;

/**
 *
 */
