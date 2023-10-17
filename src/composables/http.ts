import axios from 'axios';

export const useHttp = () => {
  const config = useRuntimeConfig();

  const http = axios.create({
    baseURL: config.public.apiUrl,
    headers: {
      Authorization: config.public.apiToken,
    },
  });

  return http;
};
