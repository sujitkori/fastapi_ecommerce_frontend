import axios from "axios";
import { clearTokens, getAccessToken, updateAccessToken } from "../utils/tokenStorage";
import { refreshAccessToken } from "../features/auth/services/authService";
import { executeLogoutCallback } from "../utils/authEvents";


const apiClient = axios.create({
    baseURL:  import.meta.env.VITE_API_BASE_URL,
    timeout:10000,
})

apiClient.interceptors.request.use((config) => { // The request is an object.
    const token = getAccessToken();

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

apiClient.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if(error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== "/auth/refresh"){
            originalRequest._retry = true;
            try {
                const response = await refreshAccessToken()

                updateAccessToken(response.access_token)
                return apiClient(originalRequest)
            } catch (refreshError) {
                clearTokens();
                executeLogoutCallback();
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default apiClient;


// Suppose we write

// apiClient.post("/auth/login", loginData)

// Internally Axios creates something similar to

// config = {
//     method: "POST",
//     url: "/auth/login",
//     data: loginData,
//     headers: {
//         "Content-Type": "application/json",
//     },
// }

// Then Axios gives us this object.

// headers: {
//         'Content-Type': 'application/json',
//     },