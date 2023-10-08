import http from "../utils/http";

export const login = (params) => http.post("Authentication/login", params);
