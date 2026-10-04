import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../services/authService";


const useRegister = () => {
    const navigate = useNavigate();

  return useMutation({
    mutationFn:registerUser,
    onSuccess: () => {
        navigate('/login')
    }
  })
}

export default useRegister
