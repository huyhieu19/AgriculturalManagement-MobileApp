import { axiosInstance } from "../index";
import { BaseResponse, Farm, LoginResponse } from "../models";
import { IZoneParams } from "../../types/zone.type";

export function login(loginPayload: { email: string; password: string }) {
	return axiosInstance.post<BaseResponse<LoginResponse>>(
		"/Authentication/login",
		loginPayload
	);
}

//farm
export function getListFarm() {
	return axiosInstance.post<BaseResponse<Farm[]>>("/Farms/farms");
}

//zone
export function getListZone(params: any) {
	return axiosInstance.post<BaseResponse<IZoneParams[]>>(
		"/Zone/zones",
		params
	);
}
