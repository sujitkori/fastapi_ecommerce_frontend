import apiClient from "../../../api/apiClient";
import { getRefreshToken } from "../../../utils/tokenStorage";
import type { LoginFormData, LoginResponse, RegisterFormData, RegisterResponse } from "../types/auth.types";


export const loginUser = async (loginData:LoginFormData):Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', loginData);
    return response.data
}

export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();

    const response = await apiClient.post('/auth/refresh', {
        refresh_token:refreshToken
    })

    return response.data
}

export const registerUser = async (registerData:RegisterFormData):Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>('/auth/register', registerData);
    return response.data;
}