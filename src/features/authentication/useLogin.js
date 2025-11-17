import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Login } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => Login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.log('ERROR', err.message);
      toast.error(`Provided email and password are incorrect`);
    },
  });
  return { login, isLoading };
}

export default useLogin;
