import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

// services
import { getBookings } from '../../services/apiBookings';

// utils
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
	// Accessing the queryClient to pre fetch
	const queryClient = useQueryClient();

	// To get the value from the url
	const [searchParams] = useSearchParams();

	// FILTER
	const filterValue = searchParams.get('status');

	const filter =
		!filterValue || filterValue === 'all'
			? null
			: { field: 'status', value: filterValue };
	// { field: 'totalPrice', value: 5000, method: 'gte' }; // Eg: If there is a method property

	// SORT
	const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
	const [field, direction] = sortByRaw.split('-');

	// Actual sortBy
	const sortBy = { field, direction };

	// PAGINATION
	const page = !searchParams.get('page')
		? 1
		: Number(searchParams.get('page'));

	// React query fetching bookings data
	const {
		isLoading,
		data: { data: bookings, count } = {},
		error,
	} = useQuery({
		queryKey: ['bookings', filter, sortBy, page], // here we are mentioning the filter, sortBy to refetch again (it's like dependancy array)
		queryFn: () => getBookings({ filter, sortBy, page }),
	});

	// Actual number of pages
	const pageCount = Math.ceil(count / PAGE_SIZE);

	// PRE-FETCHING
	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ['bookings', filter, sortBy, page + 1],
			queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
		});

	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ['bookings', filter, sortBy, page - 1],
			queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
		});

	return { isLoading, bookings, error, count };
}
