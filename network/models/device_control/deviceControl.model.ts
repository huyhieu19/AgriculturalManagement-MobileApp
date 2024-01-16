export interface OnOffDeviceQueryModel {
    moduleId: string;
    deviceId: string;
    deviceName: string | null;
    deviceType: number | null;
    deviceNameNumber: string;
    requestOn: boolean;
}