import { useMutation } from '@tanstack/react-query';
import { SignUp as SignUpApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: SignUpApi,
    onSuccess: (user) => {
      toast.success(
        `Account successfully created! Please verify your new account from the user's email address. `
      );
    },
  });
  return { signUp, isLoading };
}

export default useSignUp;
