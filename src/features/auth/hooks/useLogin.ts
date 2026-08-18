import { useMutation } from '@tanstack/react-query'
import { loginUser} from '../services/authService'
import { useAuth } from './useAuth'
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const {login} = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn:loginUser,
    onSuccess:(data) => {
      login(data);
      navigate('/')
    }
  })
}

export default useLogin
