export interface LoginResponse {
    profile: Profile
    tokenModel: TokenModel
}

interface Profile {
    id: string
    userName: string
    email: string
    address: string
    phoneNumber: string
}

interface TokenModel {
    accessToken: string
    refreshToken: string
}
