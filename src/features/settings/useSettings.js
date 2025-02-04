import { useQuery } from '@tanstack/react-query';

// services
import { getSettings } from '../../services/apiSettings';

export function useSettings() {
	// React query fetching settings data
	const {
		isLoading,
		error,
		data: settings,
	} = useQuery({
		queryKey: ['settings'],
		queryFn: getSettings,
	});

	return { isLoading, error, settings };
}
