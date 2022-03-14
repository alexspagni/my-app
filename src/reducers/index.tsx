import { combineReducers } from "redux";

import {
  getImagesReducer,
  getNameOfRover,
  setPageNumber,
} from "./getImagesReducers";
import { getImagesHided } from "./getImagesReducers";
import { LoadingReducer, makeASearch } from "./setLoadingReducer";
const rootReducer = combineReducers({
  images: getImagesReducer,
  imagesHide: getImagesHided,
  roverName: getNameOfRover,
  pageNumber: setPageNumber,
  loading: LoadingReducer,
  search: makeASearch,
});

export default rootReducer;
