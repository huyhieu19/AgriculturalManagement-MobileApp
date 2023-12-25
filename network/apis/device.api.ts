import { axiosInstance } from "..";
import { BaseResponse } from "../models";
import { DeviceInformationDisplayModel } from "../models/device_display/deviceInfor";

export function DeviceInfo(params: any) {
    return axiosInstance.post<BaseResponse<DeviceInformationDisplayModel>>("/Device/Info", params);
}