export interface BaseResponse<T> {
    Success: boolean;
    ErrorMessage: string;
    Data: T;
    StatusCode: number
}


export interface BaseResModel<T> {
    pageNumber: number;
    pageSize: number;
    totalPage: number;
    totalCount: number;
    data: T[];
}
