// ui componets
import Button from '../../ui/Button';

// custom hook
import { useCheckout } from './useCheckout';

function CheckoutButton({ bookingId }) {
	// Custom hook
	const { isCheckingOut, checkout } = useCheckout();

	return (
		<Button
			variation='primary'
			size='small'
			onClick={() => checkout(bookingId)}
			disabled={isCheckingOut}
		>
			Check out
		</Button>
	);
}

export default CheckoutButton;
