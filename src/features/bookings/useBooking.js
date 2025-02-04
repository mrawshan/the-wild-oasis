import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// services
import { getBooking } from '../../services/apiBookings';

export function useBooking() {
	// Reading the id from the url
	const { bookingId } = useParams();

	// React query fetching booking data
	const {
		isLoading,
		data: booking,
		error,
	} = useQuery({
		queryKey: ['booking', bookingId],
		queryFn: () => getBooking(bookingId),
		retry: false, // Usualy React query fetch 3 times if the data is not available, here we are stoping that behavior
	});

	return { isLoading, booking, error };
}
