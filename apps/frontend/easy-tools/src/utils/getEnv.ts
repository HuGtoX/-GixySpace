export const isDev = import.meta.env.DEV;

export const baseUrl = isDev
  ? "http://localhost:8888/api"
  : "https://tools-service.netlify.app/api";
