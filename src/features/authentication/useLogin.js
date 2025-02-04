import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// services
import { login as loginApi } from '../../services/apiAuth';

export function useLogin() {
	const queryClint = useQueryClient();
	const navigate = useNavigate();

	const { mutate: login, isLoading } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),

		onSuccess: (user) => {
			queryClint.setQueryData(['user'], user.user); // Mnually sets some data into the react query cache
			navigate('/dashboard', { replace: true });
		},

		onError: (err) => {
			console.log('ERROR', err);
			toast.error('Provided email or password are incorrect');
		},
	});

	return { login, isLoading };
}
