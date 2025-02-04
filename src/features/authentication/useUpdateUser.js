import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast'; // Notification

// services
import { updateCurrentUser } from '../../services/apiAuth';

export function useUpdateUser() {
	// Accessing the queryClient to invalidate after updating the current user
	const queryClient = useQueryClient();

	// Update user
	const { isLoading: isUpdating, mutate: updateUser } = useMutation({
		mutationFn: updateCurrentUser,

		onSuccess: () => {
			toast.success('User account successfully updated');

			// Invalidating the cache as soon as this mutation is done (Basically Refetch the data again after user updated) Which data should be ivalidated? which is ['user']
			queryClient.invalidateQueries({
				queryKey: ['user'],
			});
		},

		// Handling the error
		onError: (err) => toast.error(err.message),
	});

	return { isUpdating, updateUser };
}
