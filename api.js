import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const api = axios.create({
  baseURL: 'http://10.0.2.2:5500/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authInstance = axios.create({
  baseURL: 'http://10.0.2.2:5500/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const onRequest = (request) => {
  console.log(request);
  console.info(
    'https',
    `--> ${request.method?.toUpperCase()} ${request.baseURL}${request.url}`,
  );

  return request;
};

const onResponse = (response) => {
  console.log(response);
  console.info(
    'https',
    `<-- ${response.status} ${response.config.baseURL}${response.config.url}`,
  );

  return response.data;
};

const onError = (error) => {
  console.log(error.response);
  if (error.response) {
    console.error(
      'https',
      `<-- ${error.response.status} ${error.config.baseURL}${error.config.url}`,
    );
  }

  return error.response;
};

api.interceptors.request.use((request) => onRequest(request));
api.interceptors.response.use(
  (request) => onResponse(request),
  (error) => onError(error),
);

authInstance.interceptors.request.use((request) => onRequest(request));
authInstance.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      const token = await AsyncStorage.getItem('token');
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
authInstance.interceptors.response.use(
  (request) => onResponse(request),
  (error) => onError(error),
);
