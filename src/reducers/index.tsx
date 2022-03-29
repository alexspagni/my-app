import { combineReducers } from "redux";
import { roverDataReducer } from "./DataReducer";
import { getImagesReducer } from "./getImagesReducers";
import { getImagesHided } from "./getImagesReducers";
import { LoadingReducer, makeASearch } from "./setLoadingReducer";
import { signReducer } from "./singReducer";
/**
 * here is where all different reducer function are indicated,
 * i use combine reducer just to compress different reducer function in just one,
 * this is alwais required.
 */
const rootReducer = combineReducers({
  dataRover: roverDataReducer,
  images: getImagesReducer,
  imagesHide: getImagesHided,
  loading: LoadingReducer,
  search: makeASearch,
  sing: signReducer,
});

export default rootReducer;
