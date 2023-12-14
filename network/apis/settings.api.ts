import { axiosInstance } from "..";
import { BaseResponse } from "../models";
import { TimerCreateModel, TimerDisplayModel } from "../models/setting_timer/TimerModel";

export function getTimers() {
    return axiosInstance.post<BaseResponse<TimerDisplayModel[]>>("/timer/g/all-available");
}

export function createTimer(params: TimerCreateModel) {
    return axiosInstance.post<BaseResponse<boolean |  null>>("/timer/c", params);
}