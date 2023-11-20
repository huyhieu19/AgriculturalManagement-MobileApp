import { axiosInstance } from "../index";
import { BaseResponse, CreateFarm, Farm, LoginResponse } from "../models";
import { IZoneParams } from "../../types/zone.type";
import { CreateZone } from "../models/Zone";

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

export function createFarm(param: any) {
	return axiosInstance.post<BaseResponse<CreateFarm>>("/Farms/farm", param);
}


//zone
export function getListZone(params: any) {
	return axiosInstance.post<BaseResponse<IZoneParams[]>>(
		"/Zone/zones",
		params
	);
}
export function createZone(params: any) {
	return axiosInstance.post<BaseResponse<CreateZone>>(
		"/Zone/zone",
		params
	);
}