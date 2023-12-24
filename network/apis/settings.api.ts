import { axiosInstance } from "..";
import { BaseResponse } from "../models";
import { ThresholdCreateModel, ThresholdDisplayModel, ThresholdUpdateModel } from "../models/setting_threshold/ThresholdModel";
import { TimerCreateModel, TimerDisplayModel, TimerUpdateModel } from "../models/setting_timer/TimerModel";

export function getTimers() {
    return axiosInstance.post<BaseResponse<TimerDisplayModel[]>>("/timer/g/all-available");
}

export function createTimer(params: TimerCreateModel) {
    return axiosInstance.post<BaseResponse<boolean |  null>>("/timer/c", params);
}
export function removeTimer(id_timer: number, id_device: string) {
    return axiosInstance.post<BaseResponse<boolean |  null>>(`/timer/r?Id=${id_timer}&deviceId=${id_device}`);
}
export function updateTimer(params: TimerUpdateModel) {
    return axiosInstance.post<BaseResponse<boolean |  null>>(`/timer/u`, params);
}


export function getThres() {
    return axiosInstance.get<BaseResponse<ThresholdDisplayModel[]>>("/InstrumentSetThreshold/All");
}
export function updateThres(params: ThresholdUpdateModel) {
    return axiosInstance.post<BaseResponse<any>>("/InstrumentSetThreshold/Update", params);
}
export function createThres(params: ThresholdCreateModel) {
    return axiosInstance.post<BaseResponse<any>>("/InstrumentSetThreshold/Create", params);
}
export function removeThres(id: number) {
    return axiosInstance.delete<BaseResponse<any>>(`/InstrumentSetThreshold/DeleteById?Id=${id}`);
}