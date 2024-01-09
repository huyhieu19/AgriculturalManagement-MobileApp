import { axiosInstance } from "..";
import { BaseResponse } from "../models";

export function UserRegister(params: any) {
    return axiosInstance.post<BaseResponse<any>>("/Authentication/register", params);
}