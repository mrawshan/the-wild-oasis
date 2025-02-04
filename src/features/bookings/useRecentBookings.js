import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

// services
import { getBookingsAfterDate } from '../../services/apiBookings';

export function useRecentBookings() {
	// To get the value from the url
	const [searchParams] = useSearchParams();

	const numDays = !searchParams.get('last')
		? 7
		: Number(searchParams.get('last'));

	// Calculating the date to pass to the getBookingsAfterDate api function
	const queryDate = subDays(new Date(), numDays).toISOString();

	// React query to get all bookings based on the given date
	const { isLoading, data: bookings } = useQuery({
		queryKey: ['bookings', `last-${numDays}`],
		queryFn: () => getBookingsAfterDate(queryDate),
	});

	return { isLoading, bookings };
}
