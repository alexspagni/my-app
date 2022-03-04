import { marsObject, nasaObject } from "../type/differentType";
import {NasaApi} from "./getApi"
 export const getImageMars = async (): Promise<marsObject[]> => {
    try {
      //quello che vado a fare quì è dire che i dati che sono in result drovà essere un array di tipo nasaObject
      const response = await NasaApi.get<{ photos: marsObject[]}>('/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=XU7atD6DNBzEbPlouVUOfIWb7O04dBJwzvrF7JMX');
      
     return response.data.photos;
    } catch (err) {
      console.log("no data");
      throw err;
    }
  };
  export const getImageApi = async () => {
    try {
      const response = await NasaApi.get('/planetary/apod?&api_key=XU7atD6DNBzEbPlouVUOfIWb7O04dBJwzvrF7JMX');
     return response.data;
    } catch (err) {
      console.log("no data");
    }
  };
  