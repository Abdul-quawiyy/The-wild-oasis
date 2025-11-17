import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export default function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin is successfully created');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error('New cabin could not be created'),
  });
  return { isCreating, createCabin };
}
