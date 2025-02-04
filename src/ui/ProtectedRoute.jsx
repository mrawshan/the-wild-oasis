import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Custom hook
import { useUser } from '../features/authentication/useUser';

// ui component
import Spinner from './Spinner';

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

function ProtectedRoute({ children }) {
	const navigate = useNavigate();

	// 01) Load the authenticated user
	const { isLoading, isAuthenticated } = useUser();

	// 02) If there is NO authenticated user, redirect to the /login (Only allowd to call navigate function inside callback or useEffect not at the top level of the compent)
	useEffect(
		function () {
			if (!isAuthenticated && !isLoading) navigate('/login');
		},
		[isLoading, isAuthenticated, navigate]
	);

	// 03) While loading, show spinner
	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	// 04) If there is a user, render the app
	if (isAuthenticated) return children;
}

export default ProtectedRoute;
