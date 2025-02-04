import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast'; // Toast notification

// services
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export function useDeleteCabin() {
	// Accessing the queryClient to invalidate after delete the cabin
	const queryClient = useQueryClient();

	// Deleting the cabin row
	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		mutationFn: deleteCabinApi,

		onSuccess: () => {
			toast.success('Cabin successfully deleted');

			// Invalidating the cache as soon as this mutation is done (Basically Refetch the data again after delete) Which data should be ivalidated? which is ['cabins']
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},

		// Handling the error
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteCabin };
}
