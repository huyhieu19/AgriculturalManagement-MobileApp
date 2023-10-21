import {BaseResponse} from "../models/BaseResponse";
import {AxiosResponse} from "axios";

export class Helper {
    static isSuccess<T>(res: AxiosResponse<BaseResponse<T>>): boolean {
        if (!res.data.Success) {
            return false;
        }
        return res.data.StatusCode === 200 || res.data.StatusCode === 201;
    }

    static isTokenFail<T>(res: AxiosResponse<BaseResponse<T>>): boolean {
        if (!res.data.Success) {
            return true;
        }
        return res.data.StatusCode === 401;
    }
}
