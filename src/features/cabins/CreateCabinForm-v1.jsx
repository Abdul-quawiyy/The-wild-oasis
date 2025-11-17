import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createCabin } from '../../services/apiCabins';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import FormRow from '../../ui/FormRow';
import Textarea from '../../ui/Textarea';

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin is successfully created');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error('New cabin could not be created'),
  });

  function onSubmit(data) {
    console.log(data);
    mutate({ ...data, image: data.image[0] });
    reset();
  }
  function onError(error) {
    // console.log(error);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity must be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Regular Price must be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount must be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isCreating}
          defaultValue=""
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register('image')} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
