import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  withXSRFToken: true,
  timeout: 6000,
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

api.interceptors.response.use(
  async (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest.isRetry) {
      originalRequest.isRetry = true;
      try {
        const response = await api.get(`/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        return api(originalRequest);
      } catch (refreshError) {
        console.error('AUTHORIZATION ERROR:', refreshError);
        throw refreshError;
      }
    }
    return Promise.reject(error);
  },
);

export default api;
