import http from "../utils/http";

export const register = (params) =>
	http.post("Authentication/register", params);
