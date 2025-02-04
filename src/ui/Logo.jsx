import styled from 'styled-components';

// Custom corresponding hook (Basicaly to Consum the context value)
import { useDarkMode } from '../context/DarkModeContext';

// Styles
const StyledLogo = styled.div`
	text-align: center;
`;

const Img = styled.img`
	height: 9.6rem;
	width: auto;
`;

function Logo() {
	// 3) Consuming context value
	const { isDarkMode } = useDarkMode();

	const src = isDarkMode ? '/logo-dark.png' : '/logo-light.png';

	return (
		<StyledLogo>
			<Img src={src} alt='Logo' />
		</StyledLogo>
	);
}

export default Logo;
