import { combineReducers } from "redux";
import { librariesReducer } from "./libraries";
import { getImagesReducer } from "./getImagesReducer";
export default combineReducers({
    libraries: librariesReducer,
    images:getImagesReducer
  
});