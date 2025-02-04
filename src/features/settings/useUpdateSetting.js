import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast'; // Notification

// services
import { updateSetting as updateSettingApi } from '../../services/apiSettings';

export function useUpdateSetting() {
	// Accessing the queryClient to invalidate after updating the setting
	const queryClient = useQueryClient();

	// Edit cabin
	const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
		mutationFn: updateSettingApi,

		onSuccess: () => {
			toast.success('Setting successfully edited');

			// Invalidating the cache as soon as this mutation is done (Basically Refetch the data again after new setting updated) Which data should be ivalidated? which is ['settings']
			queryClient.invalidateQueries({
				queryKey: ['settings'],
			});
		},

		// Handling the error
		onError: (err) => toast.error(err.message),
	});

	return { isUpdating, updateSetting };
}
