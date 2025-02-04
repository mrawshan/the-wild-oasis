import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
	border: 1px solid var(--color-grey-100);
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-sm);
	border-radius: var(--border-radius-sm);
	padding: 0.4rem;
	display: flex;
	gap: 0.4rem;
`;

const FilterButton = styled.button`
	background-color: var(--color-grey-0);
	border: none;

	${(props) =>
		props.active &&
		css`
			background-color: var(--color-brand-600);
			color: var(--color-brand-50);
		`}

	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;
	/* To give the same height as select */
	padding: 0.44rem 0.8rem;
	transition: all 0.3s;

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;

function Filter({ filterField, options }) {
	// Storing the value in the url
	const [searchParams, setSearchParams] = useSearchParams();
	if (searchParams.get('page')) searchParams.set('page', 1);

	// Getting the current value from the url (\\ default value)
	const currentFilter = searchParams.get(filterField) || options.at(0).value;

	// Handler function (Storing the value in the url)
	function handleClick(value) {
		searchParams.set(filterField, value); // (name of the field in the url,  value)
		setSearchParams(searchParams);
	}

	return (
		<StyledFilter>
			{options.map((option) => (
				<FilterButton
					onClick={() => handleClick(option.value)}
					key={option.value}
					active={(option.value === currentFilter).toString()} // If we didn't convet to sring, it will through an error in console
					disabled={option.value === currentFilter}
				>
					{option.label}
				</FilterButton>
			))}
		</StyledFilter>
	);
}

export default Filter;
