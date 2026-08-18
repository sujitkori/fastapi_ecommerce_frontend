export interface LoginFormData {
    email:string;
    password:string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

export interface RegisterFormData {
    name: string;
    email: string;
    password: string
}

export interface RegisterResponse {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}