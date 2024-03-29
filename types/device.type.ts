type IDeviceOnModule = {
    id: string;
    moduleId: string;
    name: string;
    nameRef: FunctionDeviceType;
    description: string;
    zoneId: number;
    dateCreated?: string,
    isAction: boolean;
    isUsed: boolean;
    isAuto: boolean;
    unit: string;
    gate: string;
    deviceType: string;

    valueDevice?: string;
    dateValue?: string;
    isErrored?: boolean;
}

type IDeviceOnZone = {
    id: string;
    moduleId: string;
    name: string;
    nameRef: FunctionDeviceType;
    description: string;
    zoneId: number;
    dateCreated?: string,
    isAction: boolean;
    isUsed: boolean;
    isAuto: boolean;
    unit: string;
    gate: string;
    deviceType: string;

    valueDevice?: string;
    dateValue?: string;
    isErrored?: boolean;
}

export enum FunctionDeviceType {
	None = 0,
	AirTemperature = 1,
	AirHumidity = 2,
	SoilMoisture = 3,
	RainDetection = 4
}

export { IDeviceOnModule, IDeviceOnZone };