////////ALL IMPORT///////////////
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { getImageMars } from "../api/getImage";
import PhotoComponent from "../components/PhotoComponent";
import {
  addElementsToLibrariesMars,
  incrementPageNumber,
} from "../reducers/getImagesReducers";
import { Feather } from "@expo/vector-icons";
import {
  hideImageAlert,
  imageNotFoundAlert,
} from "../alertMessages/alertMessage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { imagesHided } from "../filters/FIlters";
import { SkeletonList } from "../skeleton/SkeletonList";
import { setLoadingReducer } from "../reducers/setLoadingReducer";

////////////COMPONENT////////////
let temp = 0;
const IndexScreen = () => {
  //////HOOKS+REF//////////////
  const pageNumber = useSelector((store: any) => store?.pageNumber);
  //const [loading, setLoading] = useState(true);
  const images = useSelector((store: any) => store?.images);
  const roverNameQueryng = useSelector((store: any) => store?.roverName);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const flatListRef = React.createRef<FlatList>();
  const hides = useSelector((store: any) => store?.imagesHide);
  const loading = useSelector((store: any) => store?.loading);

  //Gli unici parametri obbligatori sono quelli che riguardano il nome del rover e il numero di pagina da prendere, gli altri riguardanti l'anno sono opzionali
  useEffect(
    React.useCallback(() => {
      if (images.length) {
        //console.log("sono qui");
        flatListRef.current?.scrollToIndex({
          animated: true,
          index: 0,
          viewPosition: 0,
        });
      }
    }, [roverNameQueryng])
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
      const imagesToRender = imagesHided(results, hides);
      dispatch(addElementsToLibrariesMars(imagesToRender));
    } catch {}
    dispatch(setLoadingReducer(false));
  };

  useEffect(() => {
    try {
      console.log(roverNameQueryng);
      console.log("sono qui");
      getImageFromMars(roverNameQueryng, pageNumber, "3", "6", "2016");
    } catch {}
  }, [roverNameQueryng]);
  /*
  useFocusEffect(
    React.useCallback(() => {
      console.log(roverNameQueryng);

      console.log("sono qui");
      getImageFromMars(roverNameQueryng, pageNumber, "3", "6", "2016");
    }, [roverNameQueryng])
  );
*/
  return (
    <View style={styles.containerPrincipal}>
      {images.length ? (
        <Text style={styles.TextStyle}>{images.length}</Text>
      ) : null}
      {!images.length && !loading ? imageNotFoundAlert() : null}
      {loading ? <SkeletonList /> : null}
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ShowScreen", { image: item });
              }}
            >
              <PhotoComponent object={item} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                dispatch({
                  type: "images_hide_one",
                  payload: item,
                });
                //console.log(item);
                hideImageAlert();
              }}
            >
              <Feather name="trash" style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
        onEndReached={() => {
          const newPage = pageNumber + 1;
          // console.log(roverNameQueryng);
          getImageFromMars(roverNameQueryng, newPage);
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
  },
  checkbox: {
    margin: 8,
  },
  icon: {
    fontSize: 24,
    color: "red",
    paddingLeft: 10,
  },
  imageHeader: {
    width: 200,
    height: 200,
    borderRadius: 4,
  },
});

export default IndexScreen;
