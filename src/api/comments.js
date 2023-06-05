import axios from "axios";

import { API_BASE } from "../consts";

export const getCommentsApi = (postId) =>
  axios.get(`${API_BASE}/comments?postId=${postId}`);
