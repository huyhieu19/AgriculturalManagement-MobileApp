import { IDeviceOnModule } from "./device.type";

type IModule = {
    id: string;
    name: string;
    nameRef: string;
    moduleType: number;
    dateCreated?: string,
    note?: string | null;
    mqttServer?: string | null;
    mqttPort?: string | null;
    clientId?: string | null;
    userName?: string | null;
    password?: string | null;
    devices?: IDeviceOnModule[];
}
export { IModule };