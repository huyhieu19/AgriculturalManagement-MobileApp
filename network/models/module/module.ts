export interface ModuleDisplay{
    id: string;
    name: string;
    moduleType: number;
    dateCreated?: string,
    note?: string | null;
    mqttServer?: string | null;
    mqttPort?: string | null;
    clientId?: string | null;
    userName?: string | null;
    password?: string | null;
}