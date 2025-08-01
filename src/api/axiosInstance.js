import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://geeks-backend-project.onrender.com',
  withCredentials: true,
});

export default axiosInstance;
