import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// services
import { updateBooking } from '../../services/apiBookings';

// Updating the status and isPaid in the supabase DB
export function useCheckin() {
	// Accessing the queryClient to invalidate after updating the status and isPaid
	const queryClient = useQueryClient();

	// Navigate function
	const navigate = useNavigate();

	const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
		// mutationFn can recive only 1 argument, so we will pass an obj here to recive other arguments
		mutationFn: ({ bookingId, breakfast }) =>
			updateBooking(bookingId, {
				status: 'checked-in',
				isPaid: true,
				...breakfast,
			}),

		// Here we can access the the success data as well
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked in`);
			queryClient.invalidateQueries({ active: true }); // Another way of Invalidating the cache (Basically refetching)

			navigate('/'); // After updating, return to the home page
		},

		onError: () => toast.error('There was an error while checking in'),
	});

	return { checkin, isCheckingIn };
}
