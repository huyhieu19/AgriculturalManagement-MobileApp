
export interface LogDeviceStatusEntity {
    id: string | null;
    valueDate: string | null;
    deviceName: string | null;
    requestOn: boolean | null;
    isSuccess: boolean | null;
    typeOnOff: number | null;
    timerId: number | null;
    thresholdId: number | null;
}
export interface BaseQueryModel {
    pageNumber: number;
    pageSize: number;
}

export enum TypeOnOff {
    Manual = 0,
    Timer = 1,
    Threshold = 2
}
export interface LogDeviceDataQueryModel extends BaseQueryModel {
    valueDate: string | null;
    typeOnOff: TypeOnOff | null;
}


