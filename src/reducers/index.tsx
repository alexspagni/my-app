import { combineReducers } from "redux";
import { librariesReducer } from "./libraries";
import { getImagesReducer } from "./getImagesReducers";
import { getImagesHided } from "./getImagesReducers";
const rootReducer = combineReducers({
    libraries: librariesReducer,
    images:getImagesReducer,
    imagesHide:getImagesHided
  
});

export default rootReducer;