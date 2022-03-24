import { View, StyleSheet } from "react-native";
import { expressApi } from "../api/getApi";
import { useDispatch, useSelector } from "react-redux";
import { addError, addToken, removeError } from "../reducers/singReducer";
import { roverDataType, signType, stateUser } from "../type/differentType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationContainerRef } from "../Navigator/ContainerRef";
import { SignScreen } from "../components/SignScreen";
import React, { useEffect } from "react";
import { getImageMars } from "../api/getImage";
import { imagesFilter } from "../filters/FIlters";
import { LIBRARIES_PAGE_NUMBER } from "../reducers/DataReducer";
import { addElementsToLibrariesMarsRefreshing } from "../reducers/getImagesReducers";
import { setLoadingReducer } from "../reducers/setLoadingReducer";
export const SignUp = ({ navigation }: any) => {
  const signState: stateUser = useSelector((store: any) => store?.sing);
  const dispatch = useDispatch();
  const roverData: roverDataType = useSelector(
    (store: any) => store?.dataRover
  );
  const hides = useSelector((store: any) => store?.imagesHide);
  //fucnction to signUp a new user
  const getImageFromMars = async (
    roverName: string,
    page: number,
    day?: string,
    month?: string,
    year?: string
  ) => {
    dispatch({
      type: LIBRARIES_PAGE_NUMBER,
      payload: { ...roverData, page_number: page },
    });
    try {
      const results = await getImageMars(roverName, page, day, month, year);
      const imagesToRender = imagesFilter(results, hides);
      dispatch(addElementsToLibrariesMarsRefreshing(imagesToRender));
    } catch {}
    dispatch(setLoadingReducer(false));
  };
  const signUp = async ({ email, password }: signType) => {
    try {
      const response = await expressApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch(addToken(response.data.token));
      getImageFromMars("Opportunity", 1, "3", "6", "2016");
      navigationContainerRef.current?.navigate("IndexScreen");
    } catch (err: any) {
      console.log(err.message);
      dispatch(addError("Something is gone wrong with Sign Up"));
    }
  };

  //Every time i go to signIn screen i want to clear error message appear at the bottom of the screnn
  const clearErrorMessage = () => {
    dispatch(removeError(""));
  };
  //Every time i left this screen i'm going to call clearErrorMessage function
  React.useEffect(
    () => navigation.addListener("blur", () => clearErrorMessage()),
    [navigation]
  );
  return (
    <View style={styles.ContainerStyle}>
      <SignScreen
        HeaderScreen="Sign Up to use App"
        ButtonTitle="Sign Up"
        BottomText={`Do you already have an account?\nSign in`}
        pageToNavigate="SignIn"
        error_message={signState.error_message}
        onSubmit={signUp}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerStyle: {
    paddingTop: 50,
  },
});
