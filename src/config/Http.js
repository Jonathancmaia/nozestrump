import Axios from 'axios';
import { apiUrl } from './App';

export const Http = Axios.create({
  baseURL: apiUrl
});

export const HttpAuth = Axios.create({
  baseURL: apiUrl
});

HttpAuth.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = 'Bearer ' + await localStorage.getItem('access_token');
    return config;
  }
);

HttpAuth.interceptors.response.use( response => {
    return response;
  }, error => {
    if (error.response.status === 401){
      localStorage.removeItem('access_token');
    }
  }
);