import { imagesFilter } from "../filters/FIlters";
import { marsObject } from "../type/differentType";

const initalStateRover: marsObject[] = [];

//ACTION TYPE///////////////////////////////////////
type LibrariesAddActionType = {
  type: typeof LIBRARIES_ADD;
  payload: marsObject;
};

type LibrariesAddActionTypeMars = {
  type: typeof LIBRARIES_ADD_MARS;
  payload: marsObject[];
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
  array: marsObject[]
): LibrariesAddActionTypeMars | undefined => {
  if (array.length) {
    return {
      type: LIBRARIES_ADD_MARS,
      payload: array,
    };
  }
};
export const addElementsToLibrariesMarsRefreshing = (
  array: marsObject[]
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

type AllLibrariesAction =
  | LibrariesAddActionType
  | LibrariesAddActionTypeMars
  | LibrariesSetEmptyArray;
//////ACTIONE TYPE//////////////////////////////////
export const LIBRARIES_ADD: string = "images_add";
export const LIBRARIES_ADD_MARS: string = "images_add_mars";
export const LIBRARIES_RESET: string = "images_reset";

//REDUCERS FUNCTION////////////////////////////////////////////
export const getImagesReducer = (
  state = initalStateRover,
  action: AllLibrariesAction
) => {
  switch (action.type) {
    case LIBRARIES_ADD:
      return action.payload;

    case LIBRARIES_ADD_MARS:
      const imagesToRender = imagesFilter(
        action.payload as marsObject[],
        state
      );
      return [...state, ...(imagesToRender as marsObject[])];
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
  state = initalStateRover,
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
