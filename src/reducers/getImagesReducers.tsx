import { imagesFilter, imagesFilterDuplicate } from "../filters/FIlters";
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
//////////////////////////////////////////////////////////
export type ActionFunction = typeof addElementsToLibrariesMars;

type AllLibrariesAction = LibrariesAddActionTypeMars | LibrariesSetEmptyArray;
//////ACTIONE TYPE//////////////////////////////////
export const LIBRARIES_ADD: string = "images_add";
export const LIBRARIES_ADD_MARS: string = "images_add_mars";
export const LIBRARIES_RESET: string = "images_reset";
export const LIBRARIES_CHANGE_HIDE_STATE: string = "image_change_hide_state";

//REDUCERS FUNCTION////////////////////////////////////////////
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
      return [...state, ...(action.payload as marsObject[])];
    case LIBRARIES_HIDE_RESET:
      // setStoredImagesHideReset();
      return [];
    default:
      return state;
  }
};

/////////////////////////////////////////////////
