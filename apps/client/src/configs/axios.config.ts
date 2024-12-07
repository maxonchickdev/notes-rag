import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL:
    'http://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT + '/',
  headers: {
    'Content-Type': 'application/json',
  },
});
