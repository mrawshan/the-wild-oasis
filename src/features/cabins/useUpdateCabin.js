import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast'; // Notification

// services
import { createUpdateCabin } from '../../services/apiCabins';

export function useUpdateCabin() {
	// Accessing the queryClient to invalidate after adding the updated cabin
	const queryClient = useQueryClient();

	// Update cabin
	const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
		mutationFn: ({ newCabinData, id }) => createUpdateCabin(newCabinData, id),

		onSuccess: () => {
			toast.success('Cabin successfully updated');

			// Invalidating the cache as soon as this mutation is done (Basically Refetch the data again after new cabin added) Which data should be ivalidated? which is ['cabins']
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},

		// Handling the error
		onError: (err) => toast.error(err.message),
	});

	return { isUpdating, updateCabin };
}
