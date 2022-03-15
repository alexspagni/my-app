import { combineReducers } from "redux";

import {
  getDateRover,
  getImagesReducer,
  getNameOfRover,
  setPageNumber,
} from "./getImagesReducers";
import { getImagesHided } from "./getImagesReducers";
import { LoadingReducer, makeASearch } from "./setLoadingReducer";
import { signReducer } from "./singReducer";
const rootReducer = combineReducers({
  images: getImagesReducer,
  imagesHide: getImagesHided,
  roverName: getNameOfRover,
  dateRover: getDateRover,
  pageNumber: setPageNumber,
  loading: LoadingReducer,
  search: makeASearch,
  sing: signReducer,
});

export default rootReducer;
