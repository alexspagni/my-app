import { combineReducers } from "redux";
import { librariesReducer } from "./libraries";
import {
  getImagesReducer,
  getNameOfRover,
  setPageNumber,
} from "./getImagesReducers";
import { getImagesHided } from "./getImagesReducers";
const rootReducer = combineReducers({
  libraries: librariesReducer,
  images: getImagesReducer,
  imagesHide: getImagesHided,
  roverName: getNameOfRover,
  pageNumber: setPageNumber,
});

export default rootReducer;
