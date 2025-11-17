import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditCabin } from '../../services/apiCabins';

export default function useEditCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully Edited');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error('Cabin could not be edited'),
  });
  return { isEditing, editCabin };
}
