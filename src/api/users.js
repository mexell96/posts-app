import axios from "axios";

import { API_BASE } from "../consts";

export const getProfileApi = () => axios.get(`${API_BASE}/users/1`);
export const getUserApi = (id) => axios.get(`${API_BASE}/users/${id}`);
export const getUserPostsApi = (id) =>
  axios.get(`${API_BASE}/users/${id}/posts`);
