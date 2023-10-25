import axios from 'axios';
import { AppConfig } from './configs';
import { Helper } from './helper';
import * as LogInterceptor from './log';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axiosInstance = axios.create({
	baseURL: AppConfig.baseUrl,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use(
	async (config) => {
		const accessToken = await AsyncStorage.getItem('access-token');
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return LogInterceptor.requestLog(config);
	},
	function (error) {
		// Xử lý lỗi
		return Promise.reject(error);
	}
);

function setAccessToken(accessToken?: string) {
	axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${
		accessToken || ''
	}`;
}

function addOnUnAuthorizeListener(onUnAuthorize: () => void) {
	axiosInstance.interceptors.response.use(
		(res) => {
			if (Helper.isTokenFail(res)) {
				onUnAuthorize();
			}
			return res;
		},
		(error) => {
			return Promise.reject(error);
		}
	);
}

export { setAccessToken, addOnUnAuthorizeListener };
