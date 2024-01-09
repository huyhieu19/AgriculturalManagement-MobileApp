import { axiosInstance } from "..";
import { BaseResModel, BaseResponse } from "../models";
import { LogDeviceDataQueryModel, LogDeviceStatusEntity } from "../models/log_display/LogDevice";

export function LogOnOffDeviceControl(params: LogDeviceDataQueryModel) {
    return axiosInstance.post<BaseResponse<BaseResModel<LogDeviceStatusEntity>>>("/Logger/datadevices", params);
}