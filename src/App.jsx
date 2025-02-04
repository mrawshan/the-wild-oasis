import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast'; // Notification component (Toaster library)

// Styled components
import GlobalStyles from './styles/GlobalStyles';

// Pages
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import NewUsers from './pages/NewUsers';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Booking from './pages/Booking';
import Checkin from './pages/Checkin';

// ui components
import AppLayout from './ui/AppLayout';
import ProtectedRoute from './ui/ProtectedRoute';

// Context API
import { DarkModeProvider } from './context/DarkModeContext';

// 01) setting up react query client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// The amount of time the data in the cache will stay fresh (Until the nex API call)
			// staleTime: 60 * 1000,
			staleTime: 0,
		},
	},
});

function App() {
	return (
		<DarkModeProvider>
			{/* 02) Providing the query data to the app */}
			<QueryClientProvider client={queryClient}>
				{/* React query dev tools */}
				<ReactQueryDevtools initialIsOpen={false} />

				{/* Styled component (Global styles) */}
				<GlobalStyles />

				{/* Routes */}
				<BrowserRouter>
					<Routes>
						<Route
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route
								index
								element={<Navigate replace to='dashboard' />}
							/>
							<Route path='dashboard' element={<Dashboard />} />
							<Route path='bookings' element={<Bookings />} />
							<Route path='bookings/:bookingId' element={<Booking />} />
							<Route path='checkin/:bookingId' element={<Checkin />} />
							<Route path='cabins' element={<Cabins />} />
							<Route path='users' element={<NewUsers />} />
							<Route path='settings' element={<Settings />} />
							<Route path='account' element={<Account />} />
						</Route>

						<Route path='login' element={<Login />} />
						<Route path='*' element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>

				{/* Notification component */}
				<Toaster
					position='top-center'
					gutter={12}
					containerStyle={{ margin: '8px' }}
					toastOptions={{
						success: {
							duration: 3000,
						},

						error: {
							duration: 5000,
						},

						style: {
							fontSize: '16px',
							maxWidth: '500px',
							padding: '16px 24px',
							background: 'var(--color-grey-0)',
							color: 'var(--color-grey-700)',
						},
					}}
				/>
			</QueryClientProvider>
		</DarkModeProvider>
	);
}

export default App;
