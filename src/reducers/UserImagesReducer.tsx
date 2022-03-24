import { imagesFilter } from "../filters/FIlters";
import { lastImagesUsersType, marsObject } from "../type/differentType";
const initalStateImagesUser: lastImagesUsersType[] = [];
type LibrariesUserImagesActionAdd = {
  type: typeof LIBRARIES_USER_IMAGES;
  payload: { images: marsObject[]; token: string };
};

export const LIBRARIES_USER_IMAGES: string = "add_user_images";
type AllLibrariesAction = LibrariesUserImagesActionAdd;

export const lastImagesUsersReducer = (
  state = initalStateImagesUser,
  action: AllLibrariesAction
) => {
  switch (action.type) {
    case LIBRARIES_USER_IMAGES:
      const newArray = state.filter((element) => {
        if (element.token != action.payload.token) {
          return element;
        }
      });
      return [
        ...newArray,
        { images: action.payload.images, token: action.payload.token },
      ];
    default:
      return state;
  }
};
