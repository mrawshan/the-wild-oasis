import { useQuery } from '@tanstack/react-query';

// services
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
	// React query fetching cabin data
	const {
		isLoading,
		data: cabins,
		error,
	} = useQuery({
		queryKey: ['cabins'],
		queryFn: getCabins,
	});

	return { isLoading, cabins, error };
}
