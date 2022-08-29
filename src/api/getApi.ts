import axios from 'axios';

export const NasaApi = axios.create({
    //url di base a cui vado a fare la richiesta HTTP
    baseURL:'https://api.nasa.gov'

});


export const expressApi = axios.create({
    //url di base a cui vado a fare la richiesta HTTP
    baseURL:'http://e60d-79-40-49-231.ngrok.io'

});


