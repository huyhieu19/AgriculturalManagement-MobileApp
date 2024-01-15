export interface LoginResModel {
    token: TokenModel | null;
    profile: ProfileUser | null;
    isSuccessed: boolean;
}

export interface TokenModel{
    accessToken: string;
    refreshToken: string;
}

export interface ProfileUser{
    id: string|null;
    userName: string|null;
    email: string | null;
    address: string | null;
    phoneNumber: string | null;
}
