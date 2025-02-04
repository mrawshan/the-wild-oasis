import { useForm } from 'react-hook-form'; // React hook form library

// Custom hook
import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';

// ui components
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

function CreateCabinForm({ cabinToUpdate = {}, onCloseModal }) {
	// Custom hook
	const { isCreating, createCabin } = useCreateCabin(); // Create cabin
	const { isUpdating, updateCabin } = useUpdateCabin(); // Update cabin

	const isWorking = isCreating || isUpdating;

	// Destructuring the cabinToEdit
	const { id: updateId, ...UpdateValues } = cabinToUpdate;

	// Checking this form is using to update or create cabin
	const isUpdateSession = Boolean(updateId);

	// Using react hook form
	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isUpdateSession ? UpdateValues : {},
	});

	// Accessing the Form error messages
	const { errors } = formState;

	// Handler functions
	function onSubmit(data) {
		// Check it's the existing image or the new image
		const image = typeof data.image === 'string' ? data.image : data.image[0];

		if (isUpdateSession)
			updateCabin(
				{ newCabinData: { ...data, image }, id: updateId },
				{
					onSuccess: () => {
						reset(); // After the success reset the form
						onCloseModal?.(); // Close the modal
					},
				}
			);
		else
			createCabin(
				{ ...data, image: image },
				{
					onSuccess: () => {
						reset(); // After the success reset the form
						onCloseModal?.(); // Close the modal
					},
				}
			);
	}

	// Just to log the error in console
	function onError(errors) {
		// console.log(errors);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? 'modal' : 'regular'}
		>
			<FormRow label='Cabin name' error={errors?.name?.message}>
				<Input
					type='text'
					id='name'
					disabled={isWorking}
					{...register('name', { required: 'This field is required' })}
				/>
			</FormRow>

			<FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
				<Input
					type='number'
					id='maxCapacity'
					disabled={isWorking}
					{...register('maxCapacity', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Regular price' error={errors?.regularPrice?.message}>
				<Input
					type='number'
					id='regularPrice'
					disabled={isWorking}
					{...register('regularPrice', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Discount' error={errors?.discount?.message}>
				<Input
					type='number'
					id='discount'
					disabled={isWorking}
					defaultValue={0}
					{...register('discount', {
						required: 'This field is required',
						validate: (crrValue) =>
							+crrValue <= +getValues().regularPrice ||
							'Discount should be less than regular price',
					})}
				/>
			</FormRow>

			<FormRow
				label='Description for website'
				error={errors?.description?.message}
			>
				<Textarea
					type='number'
					id='description'
					disabled={isWorking}
					defaultValue=''
					{...register('description', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='Cabin photo'>
				<FileInput
					id='image'
					accept='image/*'
					{...register('image', {
						required: isUpdateSession ? false : 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation='secondary'
					type='reset'
					onClick={() => onCloseModal?.()}
				>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isUpdateSession ? 'Edit cabin' : 'Create new cabin'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
