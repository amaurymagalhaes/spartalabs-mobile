import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

export default Api;
