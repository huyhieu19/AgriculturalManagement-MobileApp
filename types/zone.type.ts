type IZoneParams = {
	id?: number;
	zoneName?: string;
	area?: number;
	description?: string;
	note?: string;
	timeToStartPlanting?: string | null;
	dateCreateFarm?: string | null;
	function?: string;
	farmId?: number;
	countDeviceDriver?: number | null;
	countInstrumentation?: number | null;
};

export { IZoneParams };
