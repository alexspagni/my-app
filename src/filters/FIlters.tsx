import { marsObject } from "../type/differentType";

export const imagesHided = (
  marsObjectArray: marsObject[],
  imagesHidedArray: marsObject[]
): marsObject[] => {
  const newArray = marsObjectArray.filter((element) => {
    let temp = 0;

    for (let i = 0; i < imagesHidedArray.length; i++) {
      if (element.id == imagesHidedArray[i].id) {
        temp = 1;
      }
    }
    if (temp == 0) {
      return element;
    }
  });
  return newArray;
};
