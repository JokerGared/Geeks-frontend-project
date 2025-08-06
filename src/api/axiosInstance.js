import axios from 'axios';
import { toast } from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest.url.includes('/auth/refresh') ||
      originalRequest.url.includes('/auth/login') ||
      originalRequest.url.includes('/auth/register')
    ) {
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axiosInstance.post('/auth/refresh');

        localStorage.setItem('accessToken', data.data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        toast.error('Session expired. Please log in again.');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
