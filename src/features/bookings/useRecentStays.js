import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

// services
import { getStaysAfterDate } from '../../services/apiBookings';

export function useRecentStays() {
	// To get the value from the url
	const [searchParams] = useSearchParams();

	const numDays = !searchParams.get('last')
		? 7
		: Number(searchParams.get('last'));

	// Calculating the date to pass to the getBookingsAfterDate api function
	const queryDate = subDays(new Date(), numDays).toISOString();

	// React query to get all bookings based on the given date
	const { isLoading, data: stays } = useQuery({
		queryFn: () => getStaysAfterDate(queryDate),
		queryKey: ['stays', `last-${numDays}`],
	});

	// Calculating only the cofirmed stays
	const confirmedStays = stays?.filter(
		(stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
	);

	return { isLoading, stays, confirmedStays, numDays };
}
