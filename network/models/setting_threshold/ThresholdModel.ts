export interface ThresholdDisplayModel {
    id: number;
    deviceDriverId: string;
    instrumentationId: string;
    typeDevice: string|null;
    onInUpperThreshold: boolean;
    deviceDriverAction: boolean;
    deviceInstrumentationName: string | null;
    deviceDriverName: string | null;
    thresholdValueOn: number | null;
    thresholdValueOff: number | null;
    isDelete: boolean;
}
export interface ThresholdUpdateModel {
    id: number;
    deviceDriverId: string;
    instrumentationId: string;
    typeDevice: string | null;
    onInUpperThreshold: boolean | null;
    thresholdValueOn: number | null;
    thresholdValueOff: number | null;
}
export interface ThresholdCreateModel {
    deviceDriverId: string;
    instrumentationId: string;
    typeDevice: string;
    thresholdValueOn: number | null;
    thresholdValueOff: number | null;
    onInUpperThreshold: boolean | null;
}