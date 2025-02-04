// Custom hooks
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

// ui components
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
	const {
		isLoading,
		settings: {
			minBookingLength,
			maxBookingLength,
			maxGuestsPerBooking,
			breakfastPrice,
		} = {}, // Here we are assigning the settings obj to an empty obj because of, before fetching settings data there are no values
	} = useSettings();

	// Update setting
	const { isUpdating, updateSetting } = useUpdateSetting();

	// Loading spinner
	if (isLoading) return <Spinner />;

	// Handler function
	function handleUpdate(e, nameOfTheField) {
		const { value } = e.target;

		if (!value) return;
		updateSetting({ [nameOfTheField]: value });
	}

	// This time we are using UNCONTROLLED fields, so we will NOT store state
	return (
		<Form>
			<FormRow label='Minimum nights/booking'>
				<Input
					type='number'
					id='min-nights'
					defaultValue={minBookingLength}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, 'minBookingLength')}
				/>
			</FormRow>

			<FormRow label='Maximum nights/booking'>
				<Input
					type='number'
					id='max-nights'
					defaultValue={maxBookingLength}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
				/>
			</FormRow>

			<FormRow label='Maximum guests/booking'>
				<Input
					type='number'
					id='max-guests'
					defaultValue={maxGuestsPerBooking}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
				/>
			</FormRow>

			<FormRow label='Breakfast price'>
				<Input
					type='number'
					id='breakfast-price'
					defaultValue={breakfastPrice}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
