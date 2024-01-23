export interface Farm {
	id: number;
	name: string;
	createDate: any;
	description: string;
	address: string;
	area: number;
	note: string;
	userId: string;
	countZone: any;
}

export interface DeviceDriverByFarmDisplayModel {
	farms: KeyValueForFarm[];
	zone: KeyValueForZone[];
	device: KeyValueForDevice[];
}

export interface KeyValueForFarm {
	id: number;
	name: string | null;
}

export interface KeyValueForZone {
	id: number;
	farmId: number | null;
	name: string | null;
}

export interface KeyValueForDevice {
	id: string;
	zoneId: number | null;
	name: string | null;
	nameRef: FunctionDeviceType | null;
}

export enum FunctionDeviceType {
	None = 0,
	AirTemperature = 1,
	AirHumidity = 2,
	SoilMoisture = 3,
	RainDetection = 4
}

export interface CreateFarm{
	isSuccess: boolean
}