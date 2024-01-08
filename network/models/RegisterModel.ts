export interface UserRegisterationModel {
    firstName: string | null;
    lastName: string | null;
    userName: string | null;
    password: string | null;
    email: string | null;
    phoneNumber: string | null;
    roles: string[] | null;
}