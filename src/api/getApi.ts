import axios from 'axios';

export const NasaApi = axios.create({
    //url di base a cui vado a fare la richiesta HTTP
    baseURL:'https://api.nasa.gov'

});


export const expressApi = axios.create({
    //url di base a cui vado a fare la richiesta HTTP
    baseURL:'http://e968-128-65-201-167.ngrok.io'

});


