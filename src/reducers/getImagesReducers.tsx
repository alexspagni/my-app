import {
  imagesFilter,
  setStoredImagesHideReset,
  storeImagesHidedDevice,
} from "../filters/FIlters";
import { marsObject } from "../type/differentType";
import { dateObject } from "../type/differentType";

export const initalStateRover: marsObject[] = [];
const initalStateNameRover: string = "Opportunity";
const intialPageNumber: number = 1;
const intialeEarthDate: dateObject = {
  earth_day: "3",
  earth_month: "6",
  earth_year: "2016",
};

//ACTION TYPE///////////////////////////////////////
export type LibrariesImageObjectToStore = {
  image: marsObject[];
};
type LibrariesAddActionType = {
  type: typeof LIBRARIES_ADD;
  payload: marsObject;
};
type LibrariesActionDate = {
  type: typeof LIBRARIES_DATE;
  payload: dateObject;
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
type LibrestsetRoverName = {
  type: typeof LIBRARIES_ROVER_NAME;
  payload: string;
};
type LibrestSetPageNumber = {
  type: typeof LIBRARIES_PAGE_NUMBER;
  payload: number;
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
export const resetImages = (array: any): LibrariesSetEmptyArray => {
  return {
    type: LIBRARIES_PAGE_NUMBER,
    payload: array,
  };
};
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
export const addRoverName = (string: string): LibrestsetRoverName => {
  return {
    type: LIBRARIES_ROVER_NAME,
    payload: string,
  };
};

export const incrementPageNumber = (number: number): LibrestSetPageNumber => {
  return {
    type: LIBRARIES_PAGE_NUMBER,
    payload: number,
  };
};
export const setDateRover = (object: dateObject): LibrariesActionDate => {
  return {
    type: LIBRARIES_DATE,
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

export const LIBRARIES_ROVER_NAME: string = "rover_name";
export const LIBRARIES_PAGE_NUMBER: string = "page_number";
export const LIBRARIES_RESET: string = "images_reset";
export const LIBRARIES_DATE: string = "image_date";
/////////////////////////////////////////////////
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
      //const arr = [...state, action.payload];
      //storeImagesHidedDevice(arr as marsObject[]);
      return [...state, action.payload];
    case LIBRARIES_HIDE_ALL:
      return [...state, ...(action.payload as marsObject[])];
    case LIBRARIES_HIDE_RESET:
      setStoredImagesHideReset();
      return [];
    default:
      return state;
  }
};
type AllLibrariesActionRoverName = LibrestsetRoverName;
export const getNameOfRover = (
  state = initalStateNameRover,
  action: AllLibrariesActionRoverName
) => {
  switch (action.type) {
    case LIBRARIES_ROVER_NAME:
      if (action.payload == "") {
        return state;
      } else {
        return action.payload;
      }

    default:
      return state;
  }
};
type AllLibrariesActionPageNumber = LibrestSetPageNumber;
export const setPageNumber = (
  state = intialPageNumber,
  action: AllLibrariesActionPageNumber
) => {
  switch (action.type) {
    case LIBRARIES_PAGE_NUMBER:
      return action.payload;
    default:
      return state;
  }
};

type AllLibrariesActionDateRover = LibrariesActionDate;
export const getDateRover = (
  state = intialeEarthDate,
  action: AllLibrariesActionDateRover
) => {
  switch (action.type) {
    case LIBRARIES_DATE:
      if (
        action.payload.earth_day == "" ||
        action.payload.earth_month == "" ||
        action.payload.earth_year == ""
      ) {
        return state;
      } else {
        return { ...action.payload };
      }

    default:
      return state;
  }
};
/////////////////////////////////////////////////
