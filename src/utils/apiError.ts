import axios from "axios"


export const getApiErrorMessage = (error:unknown, fallbackMessage:string = "Something went wrong"):string => {
    if(axios.isAxiosError(error)){
        return error.response?.data?.detail ?? fallbackMessage
    }

    return fallbackMessage;
}