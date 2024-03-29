export interface TimerDisplayModel {
  id: number;
  deviceName: string | null;
  dateCreated: string | null;
  dateUpdated: string | null;
  note: string | null;
  shutDownTimer: string | null;
  openTimer: string | null;
  isAffected: boolean | null;
  isSuccessON: boolean;
  isSuccessOFF: boolean;
  isRemove: boolean;
  isAuto: boolean;
  deviceType: DeviceType;
  nameRef: string;
  deviceId: string;
}

enum DeviceType {
  None = 0,
  W = 1,
  R = 2
}

export interface TimerCreateModel {
  shutDownTimer: string | null;
  openTimer: string | null;
  note: string | null;
  deviceDriverId: string;
}

export interface TimerUpdateModel {
  id: number;
  shutDownTimer: string | null;
  openTimer: string | null;
  note: string | null;
  deviceDriverId: string;
}