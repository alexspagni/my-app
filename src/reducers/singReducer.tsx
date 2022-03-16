import { sign } from "../type/differentType";
const initialState: sign = { token: "", error_message: "" };
//ACTION TYPE///////////////////////////////////////
type LibrariesAddError = {
  type: typeof LIBRARIES_ERROR;
  payload: string;
};
type LibrariesAddToken = {
  type: typeof LIBRARIES_TOKEN;
  payload: string;
};
////////////////////////////////////////
export const addError = (string: string): LibrariesAddError => {
  return {
    type: LIBRARIES_ERROR,
    payload: string,
  };
};
export const addToken = (string: string): LibrariesAddToken => {
  return {
    type: LIBRARIES_TOKEN,
    payload: string,
  };
};
//////////////////////////////////////
export const LIBRARIES_ERROR = "add_error";
export const LIBRARIES_TOKEN = "sign_up";
type AllTypeAction = LibrariesAddError | LibrariesAddToken;
export const signReducer = (
  state = initialState,
  action: AllTypeAction
): sign => {
  switch (action.type) {
    case LIBRARIES_ERROR:
      return { ...state, error_message: action.payload };
    case LIBRARIES_TOKEN:
      return { error_message: "", token: action.payload };
    default:
      return state;
  }
};
