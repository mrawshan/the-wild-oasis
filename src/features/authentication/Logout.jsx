import { HiArrowRightOnRectangle } from 'react-icons/hi2';

// ui component
import ButtonIcon from '../../ui/ButtonIcon';
import SpinnerMini from '../../ui/SpinnerMini';

// Custom hook
import { useLogout } from './useLogout';

function Logout() {
	const { logout, isLoading } = useLogout();

	return (
		<ButtonIcon disabled={isLoading} onClick={logout}>
			{!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
		</ButtonIcon>
	);
}

export default Logout;
