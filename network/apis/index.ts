import { axiosInstance } from '../index';
import { BaseResponse, Farm, LoginResponse } from '../models';

export function login(loginPayload: { email: string; password: string }) {
	return axiosInstance.post<BaseResponse<LoginResponse>>(
		'/Authentication/login',
		loginPayload
	);
}

export function getListFarm() {
	return axiosInstance.get<BaseResponse<Farm[]>>('/Farm/farms');
}
