import axios from 'axios';

export const NasaApi = axios.create({
    //url di base a cui vado a fare la richiesta HTTP
    baseURL:'https://api.nasa.gov'

});


export const expressApi = axios.create({
    //url di base a cui vado a fare la richiesta HTTP
    baseURL:'http://9996-5-102-4-113.ngrok.io'

});


