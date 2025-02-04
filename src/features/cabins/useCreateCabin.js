import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast'; // // Notification

// services
import { createUpdateCabin } from '../../services/apiCabins';

export function useCreateCabin() {
	// Accessing the queryClient to invalidate after adding the  new cabin
	const queryClient = useQueryClient();

	// Create cabin
	const { mutate: createCabin, isLoading: isCreating } = useMutation({
		mutationFn: createUpdateCabin,

		onSuccess: () => {
			toast.success('New cabin successfully created');

			// Invalidating the cache as soon as this mutation is done (Basically Refetch the data again after new cabin added) Which data should be ivalidated? which is ['cabins']
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},

		// Handling the error
		onError: (err) => toast.error(err.message),
	});

	return { isCreating, createCabin };
}
