import { state } from "../type/differentType";
const initialState: state = {
  token: "",
  error_message: "",
};

//ACTION TYPE///////////////////////////////////////

type LibrariesAddError = {
  type: typeof LIBRARIES_ERROR;
  payload: string;
};
type LibrariesAddToken = {
  type: typeof LIBRARIES_TOKEN;
  payload: string;
};
type LibrariesRemoveError = {
  type: typeof LIBRARIES_REMOVE_ERROR;
  payload: string;
};
type LibrariesResetToken = {
  type: typeof LIBRARIES_RESET_TOKEN;
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
export const removeError = (string: string): LibrariesRemoveError => {
  return {
    type: LIBRARIES_REMOVE_ERROR,
    payload: string,
  };
};
export const resetToken = (string: string): LibrariesResetToken => {
  return {
    type: LIBRARIES_RESET_TOKEN,
    payload: string,
  };
};
//////////////////////////////////////
export const LIBRARIES_ERROR = "add_error";
export const LIBRARIES_REMOVE_ERROR = "remove_error";
export const LIBRARIES_TOKEN = "signin";
export const LIBRARIES_RESET_TOKEN = "log_out";
type AllTypeAction =
  | LibrariesAddError
  | LibrariesAddToken
  | LibrariesRemoveError
  | LibrariesResetToken;
export const signReducer = (
  state = initialState,
  action: AllTypeAction
): state => {
  switch (action.type) {
    case LIBRARIES_ERROR:
      return { ...state, error_message: action.payload };
    case LIBRARIES_TOKEN:
      return {
        error_message: "",
        token: action.payload,
      };
    case LIBRARIES_REMOVE_ERROR:
      return {
        ...state,
        error_message: "",
      };
    case LIBRARIES_RESET_TOKEN:
      return { ...state, token: "" };
    default:
      return state;
  }
};
