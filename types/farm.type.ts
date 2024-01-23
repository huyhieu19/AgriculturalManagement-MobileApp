type IFramDetails = {
	id: number;
	name?: string;
	dateCreated?: string;
	description?: string;
	address?: string;
	area?: number;
	note?: string;
	countZone?: number;
};
type ThresholdId = {
	thresholdId: number;
	  driverName: string | null;
  sensorName: string | null;
};


export { IFramDetails,ThresholdId };
