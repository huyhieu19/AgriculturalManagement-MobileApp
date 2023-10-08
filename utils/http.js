import axios from "axios";

class Http {
	constructor() {
		this.instance = axios.create({
			baseURL: "https://agriculturalmanagement.azurewebsites.net/api/",
			timeout: 20000,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}

const http = new Http().instance;
export default http;
