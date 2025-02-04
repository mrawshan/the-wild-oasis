import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

// ui components
import Header from './Header';
import Sidebar from './SideBar';

// Styles
const StyledAppLatout = styled.div`
	display: grid;
	grid-template-columns: 26rem 1fr;
	grid-template-rows: auto 1fr;
	height: 100vh;
`;

const Main = styled.main`
	background-color: var(--color-grey-50);
	padding: 4rem 4.8rem 6.4rem;
	overflow: scroll;
`;

const Container = styled.div`
	max-width: 120rem;
	margin: 0 auto;

	// Giving some space
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
`;

function AppLayout() {
	return (
		<StyledAppLatout>
			<Header />
			<Sidebar />

			<Main>
				<Container>
					{/* Here we are taking the nested route using <Outlet/> */}
					<Outlet />
				</Container>
			</Main>
		</StyledAppLatout>
	);
}

export default AppLayout;
