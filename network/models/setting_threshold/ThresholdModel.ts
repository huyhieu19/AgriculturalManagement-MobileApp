export interface ThresholdDisplayModel {
    id: number;
    deviceDriverId: string;
    instrumentationId: string;
    onInUpperThreshold: boolean;
    deviceDriverAction: boolean;
    deviceInstrumentationName: string | null;
    deviceDriverName: string | null;
    thresholdValueOn: number | null;
    thresholdValueOff: number | null;
    isDelete: boolean;
    autoDevice: boolean | null;
}
export interface ThresholdUpdateModel {
    id: number;
    deviceDriverId: string;
    instrumentationId: string;
    onInUpperThreshold: boolean | null;
    thresholdValueOn: number | null;
    thresholdValueOff: number | null;
}
export interface ThresholdCreateModel {
    deviceDriverId: string;
    instrumentationId: string;
    thresholdValueOn: number | null;
    thresholdValueOff: number | null;
    onInUpperThreshold: boolean | null;
}