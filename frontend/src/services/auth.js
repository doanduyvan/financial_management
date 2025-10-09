import axios from './axiosClient';

export const register = ($payload) => {
  return axios.post('/register', $payload);
};

export const login = ($payload) => {
  return axios.post('/login', $payload);
};
