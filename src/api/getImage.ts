import { marsObject } from "../type/differentType";
import {NasaApi} from "./getApi";

const DAY:string='3';
const MONTH:string='6';
const YEAR:string='2016';
 export const getImageMars = async (roverName:string,page:number,day=DAY,month=MONTH,year=YEAR): Promise<marsObject[]> => {
    try {
      //quello che vado a fare quì è dire che i dati che sono in result drovà essere un array di tipo marsObject
      const response = await NasaApi.get<{ photos: marsObject[]}>(`/mars-photos/api/v1/rovers/${roverName}/photos?earth_date=${year}-${month}-${day}&page=${page}&api_key=XU7atD6DNBzEbPlouVUOfIWb7O04dBJwzvrF7JMX`);
     return response.data.photos;
    } catch (err) {
      console.log("no data");
      return [];
      //throw err;
      
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
