type IZoneParams = {
	id: number;
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

export interface IZoneUpdateModel {
	id: number;
	zoneName: string;
	area: number | null;
	description: string | null;
	note: string | null;
	timeToStartPlanting: string | null;
	dateCreateFarm: string | null;
	function: string | null;
	typeTreeId: number | null;
	farmId: number;
}



export { IZoneParams };
	
	
	
