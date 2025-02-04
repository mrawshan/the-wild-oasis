import { useSearchParams } from 'react-router-dom';

// ui component
import Select from './Select';

function SortBy({ options }) {
	// Storing the value in the url
	const [searchParams, setSearchParams] = useSearchParams();

	// Getting the current value from the url (\\ default value)
	const sortBy = searchParams.get('sortBy') || '';

	// Handler function (Storing the value in the url)
	function handleChange(e) {
		searchParams.set('sortBy', e.target.value); // (name of the field in the url,  value)
		setSearchParams(searchParams);
	}

	return (
		<Select
			options={options}
			type='white'
			onChange={handleChange}
			value={sortBy}
		/>
	);
}

export default SortBy;
