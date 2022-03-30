import { stateUser } from "../type/differentType";
const initialState: stateUser = {
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

/**
 * This reducer is used to get access and to store token and error message
 * about a user who's logged in.
 * LIBRARIES_ERROR--> just add to the state an error occured during log in
 * LIBRARIES_TOKEN:--> used to add a user token to the state
 * LIBRARIES_REMOVE_ERROR--> used to remove error occured during user log in because user logged in correctlu
 * LIBRARIES_RESET_TOKEN--> used to reset user token when a user loged out
 *
 *
 */
export const signReducer = (state = initialState, action: AllTypeAction) => {
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
