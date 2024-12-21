import axios, { AxiosInstance } from 'axios';
// import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const http: AxiosInstance = axios.create({
  baseURL: 'https://up-nepa-f4722a9f5b60.herokuapp.com/api/v1',
});

http.interceptors.request.use(
  async (req) => {
    req.headers.Authorization = localStorage.getItem('token') || '';
    return req;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/auth/login'; // Navigate to login page on 401
    }
    return Promise.reject(error);
  }
);

const useHttpInterceptor = () => {
  // const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = http.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // navigate('/auth/login'); // Navigate to login page on 401
        }
        return Promise.reject(error);
      }
    );

    return () => {
      http.interceptors.response.eject(responseInterceptor);
    };
  }, []);
};

export default useHttpInterceptor;
