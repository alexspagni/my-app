import { roverDataType } from "../type/differentType";
const intialStateRoverData: roverDataType = {
  rover_name: "Opportunity",
  page_number: 1,
  earth_day: "3",
  earth_month: "6",
  earth_year: "2016",
};
export const LIBRARIES_ROVER_NAME: string = "rover_name";
export const LIBRARIES_PAGE_NUMBER: string = "page_number";
export const LIBRARIES_DATE: string = "image_date";
type LibrariesActionRoverData = {
  type:
    | typeof LIBRARIES_DATE
    | typeof LIBRARIES_ROVER_NAME
    | typeof LIBRARIES_PAGE_NUMBER;
  payload: {
    page_number?: number;
    rover_name?: string;
    earth_day?: string;
    earth_month?: string;
    earth_year?: string;
  };
};
/**
 * this reducer is used to store data about images to search.
 * LIBRARIES_DATE-->is used to update the date used to search images, date will be update just if all field are filled
 * LIBRARIES_PAGE_NUMBER-->is used to update the page of images app have to search for.
 * LIBRARIES_ROVER_NAME-->is used to update the name of rover application have to search by.
 */
export const roverDataReducer = (
  state = intialStateRoverData,
  action: LibrariesActionRoverData
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
        return {
          ...state,
          earth_day: action.payload.earth_day,
          earth_month: action.payload.earth_month,
          earth_year: action.payload.earth_year,
        };
      }
    case LIBRARIES_PAGE_NUMBER:
      return { ...state, page_number: action.payload.page_number };
    case LIBRARIES_ROVER_NAME:
      return { ...state, rover_name: action.payload.rover_name };
    default:
      return state;
  }
};
