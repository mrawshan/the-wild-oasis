import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// services
import { updateBooking } from '../../services/apiBookings';

// Updating the status and isPaid in the supabase DB
export function useCheckout() {
	// Accessing the queryClient to invalidate after updating the status and isPaid
	const queryClient = useQueryClient();

	const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
		mutationFn: (bookingId) =>
			updateBooking(bookingId, {
				status: 'checked-out',
			}),

		// Here we can access the the success data as well
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked out`);
			queryClient.invalidateQueries({ active: true }); // Another way of Invalidating the cache (Basically refetching)
		},

		onError: () => toast.error('There was an error while checking out'),
	});

	return { checkout, isCheckingOut };
}
