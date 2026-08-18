import { useQuery } from "@tanstack/react-query"
import { getProfile } from "../services/userService"



const useProfile = () => {

    return useQuery({
        queryKey: ["profile"],
        queryFn:getProfile
    })
}

export default useProfile;