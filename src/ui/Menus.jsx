import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';

// Custom hook
import { useOutsideClick } from '../hooks/useOutsideClick';

const Menu = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const StyledToggle = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-700);
	}
`;

const StyledList = styled.ul`
	position: fixed;

	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-md);

	right: ${(props) => props.position.x}px;
	top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
	width: 100%;
	text-align: left;
	background: none;
	border: none;
	padding: 1.2rem 2.4rem;
	font-size: 1.4rem;
	transition: all 0.2s;

	display: flex;
	align-items: center;
	gap: 1.6rem;

	&:hover {
		background-color: var(--color-grey-50);
	}

	& svg {
		width: 1.6rem;
		height: 1.6rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}
`;

// WITH COMPOUND COMPONENT PATTERN //

// 01) Create a context
const MenusContext = createContext();

// 02) Create parent component
function Menus({ children }) {
	// Which one is currently open ID
	const [openId, setOpenId] = useState('');

	const [position, setPosition] = useState(null);

	// Handler functions
	const close = () => setOpenId('');
	const open = setOpenId;

	// Provide the state to all our child components
	return (
		<MenusContext.Provider
			value={{ openId, close, open, position, setPosition }}
		>
			{children}
		</MenusContext.Provider>
	);
}

// 03) Create child components
function Toggle({ id }) {
	const { openId, close, open, setPosition } = useContext(MenusContext);

	function handleClick(e) {
		// Stop the propagation of the event
		e.stopPropagation();

		// Position calculation (Getting some data about the element position) (To render the StyledList)
		const rect = e.target.closest('button').getBoundingClientRect();

		// Calculating and Setting the position
		setPosition({
			x: window.innerWidth - rect.width - rect.x,
			y: rect.y + rect.height + 8,
		});

		openId === '' || openId !== id ? open(id) : close();
	}

	return (
		<StyledToggle onClick={handleClick}>
			<HiEllipsisVertical />
		</StyledToggle>
	);
}

function List({ id, children }) {
	const { openId, position, close } = useContext(MenusContext);

	// Close when we click outside the list (custom hook)
	// const ref = useOutsideClick(close);
	const ref = useOutsideClick(close, false);

	if (openId !== id) return null;

	// React Portal for modal window using: createPortal(JSX, DOM note (where we want to render this JSX)) Basically we do this for the elements which will float on top of the UI
	return createPortal(
		<StyledList position={position} ref={ref}>
			{children}
		</StyledList>,
		document.body
	);
}

function Button({ children, icon, onClick }) {
	const { close } = useContext(MenusContext);

	// handler function
	function handleClick() {
		onClick?.();
		close();
	}

	return (
		<li>
			<StyledButton onClick={handleClick}>
				{icon}
				<span>{children}</span>
			</StyledButton>
		</li>
	);
}

// 04) Add child components as properties to parent component
Menus.Menu = Menu; // Menu is Just the Styled component
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
