import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// services
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';

export function useDeleteBooking() {
	// Accessing the queryClient to invalidate after delete the booking
	const queryClient = useQueryClient();

	// Deleting the booking row
	const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
		mutationFn: deleteBookingApi,

		onSuccess: () => {
			toast.success('Booking successfully deleted');
			queryClient.invalidateQueries({ active: true }); // Another way of Invalidating the cache (Basically refetching)
		},

		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteBooking };
}
