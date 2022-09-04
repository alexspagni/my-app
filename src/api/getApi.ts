import axios from 'axios';

export const NasaApi = axios.create({
    //url di base a cui vado a fare la richiesta HTTP
    baseURL:'https://api.nasa.gov'

});


export const expressApi = axios.create({
    //url di base a cui vado a fare la richiesta HTTP
    baseURL:'https://7bc6-5-102-3-232.ngrok.io'

});
