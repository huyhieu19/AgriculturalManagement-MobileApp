export interface BaseResponse<T> {
    Success: boolean;
    ErrorMessage: string;
    Data: T;
    StatusCode: number
}
