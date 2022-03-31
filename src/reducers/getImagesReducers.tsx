import { filterImagesHided, imagesFilterDuplicate } from "../filters/FIlters";
import { marsObject, imageType } from "../type/differentType";

export const initalStateRoverImagesHide: marsObject[] = [];

export const initalStateRover: imageType[] = [];
//ACTION TYPE///////////////////////////////////////

type LibrariesAddActionTypeMars = {
  type: typeof LIBRARIES_ADD_MARS;
  payload: imageType[];
};

type LibrariesResetActionHide = {
  type: typeof LIBRARIES_HIDE_ONE;
  payload: marsObject;
};
type LibrariesResetActionHideAll = {
  type: typeof LIBRARIES_HIDE_ALL;
  payload: marsObject[];
};

type LibrariesSetEmptyArray = {
  type: typeof LIBRARIES_RESET;
  payload: [];
};
type LibrariesResetImagesHide = {
  type: typeof LIBRARIES_HIDE_RESET;
  payload: [];
};
//ACTION FUNCTION//////////////////////////////////////////

export const addElementsToLibrariesMars = (
  array: imageType[]
): LibrariesAddActionTypeMars | undefined => {
  if (array.length) {
    return {
      type: LIBRARIES_ADD_MARS,
      payload: array,
    };
  }
};
export const addElementsToLibrariesMarsRefreshing = (
  array: imageType[]
): LibrariesAddActionTypeMars | undefined => {
  if (array.length) {
    return {
      type: LIBRARIES_ADD,
      payload: array,
    };
  } else {
    return {
      type: LIBRARIES_ADD,
      payload: [],
    };
  }
};
export const changeImageHideState = (
  array: imageType[]
): LibrariesAddActionTypeMars | undefined => {
  if (array.length) {
    return {
      type: LIBRARIES_CHANGE_HIDE_STATE,
      payload: array,
    };
  }
};
export const addElementsToLibrariesHide = (
  object: marsObject
): LibrariesResetActionHide => {
  return {
    type: LIBRARIES_HIDE_ONE,
    payload: object,
  };
};

export const resetImagesHide = (array: any): LibrariesResetImagesHide => {
  return {
    type: LIBRARIES_HIDE_RESET,
    payload: [],
  };
};
export const hideAllImages = (
  imagesHide: imageType[]
): LibrariesResetActionHideAll => {
  const newArray = imagesHide.map((element) => {
    return element.image;
  });
  return {
    type: LIBRARIES_HIDE_ALL,
    payload: newArray,
  };
};
//////////////////////////////////////////////////////////
export type ActionFunction = typeof addElementsToLibrariesMars;

type AllLibrariesAction = LibrariesAddActionTypeMars | LibrariesSetEmptyArray;
//////ACTIONE TYPE//////////////////////////////////
export const LIBRARIES_ADD: string = "images_add";
export const LIBRARIES_ADD_MARS: string = "images_add_mars";
export const LIBRARIES_RESET: string = "images_reset";
export const LIBRARIES_CHANGE_HIDE_STATE: string = "image_change_hide_state";

//REDUCERS FUNCTION////////////////////////////////////////////
/**
 * this reducer is used to store differet images, in order to use them on the application
 *  LIBRARIES_ADD--> it return as state the payload passed to the reducer, this case is used every time a user makes a new search
 * LIBRARIES_ADD_MARS--> it add a new array of images to the current state, this case is used every time a user scroll down the list until the end
 * LIBRARIES_RESET--> it reset the state to an empty array. this is also the value of the initial state.
 */
export const getImagesReducer = (
  state = initalStateRover,
  action: AllLibrariesAction
) => {
  switch (action.type) {
    case LIBRARIES_ADD:
      return action.payload;

    case LIBRARIES_ADD_MARS:
      const imagesToRender = imagesFilterDuplicate(
        action.payload as imageType[],
        state
      );
      return [...state, ...(imagesToRender as imageType[])];
    case LIBRARIES_RESET:
      return [];

    default:
      return state;
  }
};

export const LIBRARIES_HIDE_ONE: string = "images_hide_one";
export const LIBRARIES_HIDE_ALL: string = "images_hide_all";
export const LIBRARIES_HIDE_RESET: string = "images_hide_reset";

type AllLibrariesActionHide =
  | LibrariesResetActionHide
  | LibrariesResetActionHideAll;
/**
 * this reducer is used to store images hided.
 * LIBRARIES_HIDE_ONE-->it is used to add just one image hided to the state, this image will be add just if is not already in the state
 * LIBRARIES_HIDE_ALL-->it is user to add an entire array of images fetch from the user to the current state, only images that are not already in the state will be added
 * LIBRARIES_HIDE_RESET-->it is used to reset the state to an empty array, which is the initial value of the state.
 */
export const getImagesHided = (
  state = initalStateRoverImagesHide,
  action: AllLibrariesActionHide
) => {
  switch (action.type) {
    case LIBRARIES_HIDE_ONE:
      for (let i = 0; i < state.length; i++) {
        if (state[i].id == (action.payload as marsObject).id) {
          return state;
        }
      }

      return [...state, action.payload];
    case LIBRARIES_HIDE_ALL:
      const newArray = filterImagesHided(action.payload as marsObject[], state);
      return [...state, ...(newArray as marsObject[])];
    case LIBRARIES_HIDE_RESET:
      // setStoredImagesHideReset();
      return [];
    default:
      return state;
  }
};

/////////////////////////////////////////////////
