import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 8000, // request timeout
});

// request interceptor

axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers['x-access-token'] = `${
      localStorage.getItem('accessToken') ?? ''
    }`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
