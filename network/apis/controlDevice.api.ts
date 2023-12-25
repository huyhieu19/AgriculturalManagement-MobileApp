import { axiosInstance } from "..";
import { BaseResponse } from "../models";

export function OnOffDeviceControl(params: any) {
    return axiosInstance.post<BaseResponse<boolean | string>>("/DeviceControl/OnOffModel", params);
}

export function AsyncOnOffDeviceControl() {
    return axiosInstance.post<BaseResponse<boolean | string | null>>("/DeviceControl/asyncOnOff");
}