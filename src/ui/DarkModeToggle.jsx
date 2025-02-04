import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

// ui component
import ButtonIcon from './ButtonIcon';

// Custom corresponding hook (Basicaly to Consum the context value)
import { useDarkMode } from '../context/DarkModeContext';

function DarkModeToggle() {
	// 3) Consuming context value
	const { isDarkMode, toggleDarkMode } = useDarkMode();

	return (
		<ButtonIcon onClick={toggleDarkMode}>
			{isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
		</ButtonIcon>
	);
}

export default DarkModeToggle;
