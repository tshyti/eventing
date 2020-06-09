import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_ENDPOINT,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
