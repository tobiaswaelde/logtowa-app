import axios from 'axios';

export const useHttp = () => {
  const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      Authorization: import.meta.env.VITE_API_TOKEN,
    },
  });

  return http;
};
