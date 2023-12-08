import { axiosInstance } from "../index";
import { BaseResponse, CreateFarm, Farm, LoginResponse } from "../models";
import { IZoneParams } from "../../types/zone.type";
import { CreateZone } from "../models/Zone";
import { IModule } from "../../types/module.type";
import { IDeviceOnModule, IDeviceOnZone } from "../../types/device.type";


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

export function getDevicesOnZone(zoneId: number) {
	return axiosInstance.post<BaseResponse<IDeviceOnZone[]>>(
		`/Zone/devices-on-zone?zoneId=${zoneId}`
	);
}
export function getInstrumentationOnZone(zoneId: number) {
	return axiosInstance.post<BaseResponse<IDeviceOnZone[]>>(
		`/Zone/device-instrumentation-used?zoneId=${zoneId}`
	);
}
export function getControlOnZone(zoneId: number) {
	return axiosInstance.post<BaseResponse<IDeviceOnZone[]>>(
		`/Zone/device-control-used?zoneId=${zoneId}`
	);
}

// thêm device vào zone
export function AddDeviceToZone(deviceId: string, zoneId: number) {
	return axiosInstance.post<BaseResponse<IDeviceOnZone[]>>(
		`/Zone/add-used-device?deviceId=${deviceId}&zoneId=${zoneId}`
	);
}

// Module
export function getListModules() {
	return axiosInstance.post<BaseResponse<IModule>>(
		"/Module/get-modules"
	);
}
export function getListModulesDeviceUsed() {
	return axiosInstance.post<BaseResponse<IModule>>(
		"/Module/get-modules-devices-used"
	);
}
export function createModule(params: any) {
	return axiosInstance.post<BaseResponse<boolean | string>>(
		'/Module/add-module-to-user',

		params
	);
}
export function getListDevicesOnModule() {
	return axiosInstance.post<BaseResponse<IDeviceOnModule>>(
		"/Module/get-modules"
	);
}
export function removeModuleFromUser(moduleId: string) {
	return axiosInstance.post<BaseResponse<boolean | undefined | string>>(
		`/Module/remove-module-from-user?moduleId=${moduleId}`
	);
}
export function editDevice(param: any) {
	return axiosInstance.post<BaseResponse<boolean | undefined>>("/Module/edit-devices", param);
}
