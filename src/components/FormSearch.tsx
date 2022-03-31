import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SearchImputText from "./SearchImputText";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import {
  setLoadingReducer,
  setSearchReducer,
} from "../reducers/setLoadingReducer";
import { Ionicons } from "@expo/vector-icons";
import { roverDataType } from "../type/differentType";
import { LIBRARIES_DATE } from "../reducers/DataReducer";
import { ButtonComponent } from "./ButtonComponent";
/**
 * this component is used to show different input text to enable the user search images by date.
 * It doesn't receive any prop.
 */
const FormSearch: React.FC = () => {
  //Different hook to set value of text input, every time a user write somethin in them.

  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const roverData: roverDataType = useSelector(
    (store: any) => store?.dataRover
  );

  const search = useSelector((store: any) => store?.search);
  const dispatch = useDispatch();

  return (
    <View style={styles.backgroundStyle}>
      <TouchableOpacity
        style={styles.IconX}
        onPress={() => navigationContainerRef.current?.navigate("IndexScreen")}
      >
        <Image source={require("../../assets/iconX.png")} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 15,
        }}
      >
        <Text style={styles.TextStyle}>Date Filter</Text>
        <TouchableOpacity
          style={styles.iconStyle}
          onPress={() =>
            navigationContainerRef.current?.navigate("InfoSearchScreen")
          }
        >
          <Ionicons
            name="ios-information-circle-outline"
            size={35}
            color="white"
          />
        </TouchableOpacity>
      </View>
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
          buttonName="Search by date"
          heightButton={40}
          buttonWidth={180}
          onPressButton={() => {
            /**
             * when a user tap on "search by date button" i'm going to set "search" value to it's opposite,
             * in order to allow search images possible. I also need to set loading value to true in order to show "gravitazionalBall" component
             */
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
            dispatch(setLoadingReducer(true));
            navigationContainerRef.current?.navigate("IndexScreen");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#181A1C",
    flex: 1,
  },

  TextStyle: {
    color: "white",
    fontSize: 25,
    marginLeft: 20,
    marginTop: 100,
  },
  ImputTextContainer: {
    flexDirection: "row",
    top: 0,
    marginTop: 20,
    position: "relative",
    bottom: 90,
  },
  IconX: {
    position: "relative",
    left: 15,
    top: 35,
    width: 50,
    height: 40,
  },
  ButtonView: {
    marginTop: 30,
    marginLeft: 85,
  },
  iconStyle: {
    position: "relative",
    top: 100,
    marginLeft: 20,
  },
});
export default FormSearch;

/**
 * 

      
     
     
     
 */
