type IDeviceOnModule = {
    id: string;
    moduleId: string;
    name: string;
    nameRef: string;
    description: string;
    zoneId: number;
    dateCreated?: string,
    isAction: boolean;
    isUsed: boolean;
    isAuto: boolean;
    unit: string;
    gate: string;
    deviceType: string;
}
export { IDeviceOnModule };