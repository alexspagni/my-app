import { imageType, marsObject } from "../type/differentType";
import AsyncStorage from "@react-native-async-storage/async-storage";
/**
 * i'm gonna use this fuction to add to imagesHides state just images which are not already in the state.
 */
export const filterImagesHided = (
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

/**
 * this function is used to understant which images must be hided and which images should be shown
 * it return an array of ImageType. to understand which images should be hide for every element of marsObjectArray
 * i inspects imagesHidedArray and i hide this image if i find the same image in this array.
 * fo
 */
export const imagesFilterHideImage = (
  marsObjectArray: marsObject[],
  imagesHidedArray: marsObject[]
): imageType[] => {
  const newArray = marsObjectArray.map((element) => {
    let temp = 0;
    for (let i = 0; i < imagesHidedArray.length; i++) {
      if (element.id == imagesHidedArray[i].id) {
        temp = 1;
      }
    }
    if (temp == 0) {
      return {
        image: element,
        hide: false,
      };
    } else {
      return {
        image: element,
        hide: true,
      };
    }
  });
  return newArray;
};
/**
 * this function return an array of ImageType. is used when a user scroll the list until the end
 * with this function i'm going to understand if an image is already in the list which is shown
 * to the user or if there isn't
 */
export const imagesFilterDuplicate = (
  marsObjectArray: imageType[],
  imagesHidedArray: imageType[]
): imageType[] => {
  const newArray = marsObjectArray.filter((element) => {
    let temp = 0;

    for (let i = 0; i < imagesHidedArray.length; i++) {
      if (element.image.id == imagesHidedArray[i].image.id) {
        temp = 1;
      }
    }
    if (temp == 0) {
      return element;
    }
  });
  return newArray;
};
/**
 * this function is used when a user is watching details of an image. if he press on the button
 * "hide this images" i'm going to map the image user wants to hide with the property hide=true.
 * In this way the image won't be shown on the screen.
 */
export const hideAnImage = (
  images: imageType[],
  item: marsObject
): imageType[] => {
  const newArray = images.map((element) => {
    if (element.image.id == item.id) {
      return { image: element.image, hide: true };
    } else {
      return element;
    }
  });
  return newArray;
};
export const dontShowImagesHide = (
  images: imageType[],
  imagesHide: marsObject[]
) => {
  const newArray = images.map((element) => {
    let temp = 0;

    for (let i = 0; i < imagesHide.length; i++) {
      if (element.image.id == imagesHide[i].id) {
        temp = 1;
      }
    }
    if (temp == 0) {
      return {
        image: element.image,
        hide: false,
      };
    } else {
      return {
        image: element.image,
        hide: true,
      };
    }
  });

  return newArray;
};
export const setStoredImagesHideReset = async () => {
  try {
    await AsyncStorage.removeItem("images");
  } catch {}
};
