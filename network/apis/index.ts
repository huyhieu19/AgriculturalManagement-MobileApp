import { axiosInstance } from "../index";
import { BaseResponse, CreateFarm, Farm, LoginResponse } from "../models";
import { IZoneParams } from "../../types/zone.type";
import { CreateZone } from "../models/Zone";
import { ICreateModuleParams } from "../models/module/module";
import { IModule } from "../../types/module.type";
import { IDeviceOnModule } from "../../types/device.type";


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

// Module
export function getListModules() {
	return axiosInstance.post<BaseResponse<IModule>>(
		"/Module/get-modules"
	);
}
export function createModule(moduleId: string) {
	return axiosInstance.post<BaseResponse<boolean | string>>(
		`/Module/add-module-to-user?moduleId=${moduleId}`
	);
}
export function getListDevicesOnModule() {
	return axiosInstance.post<BaseResponse<IDeviceOnModule>>(
		"/Module/get-modules"
	);
}
export function removeModuleFromUser(moduleId: string) {
	return axiosInstance.post<BaseResponse<boolean | string>>(
		`/Module/remove-module-from-user?moduleId=${moduleId}`
	);
}