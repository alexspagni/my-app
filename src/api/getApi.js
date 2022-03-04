import axios from 'axios';

export default axios.create({
    //url di base a cui vado a fare la richiesta HTTP
    baseURL:'https://api.nasa.gov/planetary'

});


