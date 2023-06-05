import axios from "axios";

import { API_BASE } from "../consts";

export const getPostsApi = () => axios.get(`${API_BASE}/posts`);
