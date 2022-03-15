import { sign } from "../type/differentType";
const initialState: sign = { signIn: false, error_message: "" };
//ACTION TYPE///////////////////////////////////////
type LibrariesAddError = {
  type: typeof LIBRARIES_ERROR;
  payload: string;
};
////////////////////////////////////////
export const addError = (string: string): LibrariesAddError => {
  return {
    type: LIBRARIES_ERROR,
    payload: string,
  };
};

//////////////////////////////////////
export const LIBRARIES_ERROR = "add_error";
type AllTypeAction = LibrariesAddError;
export const signReducer = (
  state = initialState,
  action: AllTypeAction
): sign => {
  switch (action.type) {
    case LIBRARIES_ERROR:
      return { ...state, error_message: action.payload };
    default:
      return state;
  }
};
