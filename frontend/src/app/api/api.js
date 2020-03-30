import axios from "axios";

import Environment from "../../environment";

const api = axios.create({
  baseURL: Environment.API_URL
});

api.interceptors.request.use(async config => {
  const token = sessionStorage.getItem('@crudToken');

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;