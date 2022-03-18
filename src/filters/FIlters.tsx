import {
  initalStateRover,
  LibrariesImageObjectToStore,
} from "../reducers/getImagesReducers";
import { marsObject } from "../type/differentType";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const imagesFilter = (
  marsObjectArray: marsObject[],
  imagesHidedArray: marsObject[]
): marsObject[] => {
  const newArray = marsObjectArray.filter((element) => {
    let temp = 0;

    for (let i = 0; i < imagesHidedArray.length; i++) {
      if (element.id == imagesHidedArray[i].id) {
        temp = 1;
      }
    }
    if (temp == 0) {
      return element;
    }
  });
  return newArray;
};

export const storeImagesHidedDevice = async (images: marsObject[]) => {
  const imageObjectToStore: LibrariesImageObjectToStore = {
    image: images,
  };
  try {
    const jsonValue = JSON.stringify(imageObjectToStore);
    await AsyncStorage.setItem("images", jsonValue);
  } catch (e) {
    console.log(
      "si è verificato un errore nel setttare le immagini e sono qui"
    );
  }
};
export const getStoredImagesHidedDevice = async (): Promise<marsObject[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem("images");
    if (jsonValue != null) {
      const result = JSON.parse(jsonValue) as LibrariesImageObjectToStore;
      return result.image;
    } else {
      return [];
    }
  } catch (e) {
    console.log(
      "si è verificato un errore nel prenderre le immagini e sono qui"
    );
    return [];
  }
};
