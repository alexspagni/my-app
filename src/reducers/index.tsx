import { combineReducers } from "redux";
import { librariesReducer } from "./libraries";
import { getImagesReducer } from "./getImagesReducers";

const rootReducer = combineReducers({
    libraries: librariesReducer,
    images:getImagesReducer
  
});

export default rootReducer;