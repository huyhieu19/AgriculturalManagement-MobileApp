import { axiosInstance } from "..";
import { BaseResponse } from "../models";
import { TimerDisplayModel } from "../models/setting_timer/TimerModel";

export function getTimers() {
    return axiosInstance.post<BaseResponse<TimerDisplayModel[]>>("/timer/g/all-available");
}