import axios, { AxiosInterceptorManager, AxiosRequestConfig } from 'axios';
import { wrapper } from 'store';

const instance = axios.create({
  baseURL: process.env.API_ENDPOINT,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
