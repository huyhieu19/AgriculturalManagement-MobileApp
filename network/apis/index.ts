import {axiosInstance} from "../index";
import {BaseResponse} from "../models/BaseResponse";
import {LoginResponse} from "../models/LoginResponse";

export function login(loginPayload: { email: string, password: string }) {
    return axiosInstance.post<BaseResponse<LoginResponse>>("/Authentication/login", loginPayload)
}

export function getListFarm() {
    return axiosInstance.get<BaseResponse<any>>('/Farm/farms')
}
