import getApi from "./getApi"
 export default getImageApi = async () => {
    try {
      const response = await getApi.get('/apod?api_key=XU7atD6DNBzEbPlouVUOfIWb7O04dBJwzvrF7JMX');
     return response.data;
    } catch (err) {
      console.log("no data");
    }
  };
  