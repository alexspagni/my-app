import { combineReducers } from "redux";
import { librariesReducer } from "./libraries";
import { getImagesReducer } from "./getImagesReducers";
export default combineReducers({
    libraries: librariesReducer,
    images:getImagesReducer
  
});