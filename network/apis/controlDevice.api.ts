import { axiosInstance } from "..";
import { BaseResponse } from "../models";
import { OnOffDeviceQueryModel } from "../models/device_control/deviceControl.model";

export function OnOffDeviceControl(params: OnOffDeviceQueryModel) {
    return axiosInstance.post<BaseResponse<boolean | string>>("/DeviceControl/OnOffModel", params);
}

export function AsyncOnOffDeviceControl() {
    return axiosInstance.post<BaseResponse<boolean | string | null>>("/DeviceControl/asyncOnOff");
}