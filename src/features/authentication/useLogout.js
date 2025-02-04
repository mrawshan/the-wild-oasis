import { useMutation, useQueryClient } from '@tanstack/react-query';
import { replace, useNavigate } from 'react-router-dom';

// services
import { logout as logoutApi } from '../../services/apiAuth';

export function useLogout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: logout, isLoading } = useMutation({
		mutationFn: logoutApi,

		onSuccess: () => {
			// Remove the current user from react query cache + other queries
			queryClient.removeQueries();

			navigate('/login', { replace: true });
		},
	});

	return { logout, isLoading };
}
