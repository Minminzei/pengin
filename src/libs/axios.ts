import axios from 'axios';
import Constants from 'expo-constants';
const axiosInstance = axios.create({
  baseURL:  Constants.manifest?.extra?.API_SERVER || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  },
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers['X-Service-Name'] = 'pengin';
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => console.error('error', error),
);

export default axiosInstance;