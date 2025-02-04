// Custom hook
import { useCabins } from './useCabins';
import { useSearchParams } from 'react-router-dom';

// ui components
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';

// features components
import CabinRow from './CabinRow';

function CabinTable() {
	// Fetching cabins
	const { isLoading, cabins } = useCabins();

	// FILTER
	// Getting the data from the url
	const [searchParams] = useSearchParams();
	const filterValue = searchParams.get('discount') || 'all'; // (name of the field in the url)

	let filteredCabins;

	if (filterValue === 'all') filteredCabins = cabins;

	if (filterValue === 'no-discount')
		filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

	if (filterValue === 'with-discount')
		filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

	// SORT
	// Getting the data from the url
	const sortBy = searchParams.get('sortBy') || 'name-asc'; // searchParams.get(name of the field in the url) || default value
	const [field, direction] = sortBy.split('-');

	// Little trics to sort as Ascending / Descending order
	const modifier = direction === 'asc' ? 1 : -1;

	const sortedCabins = filteredCabins?.sort(
		(a, b) => (a[field] - b[field]) * modifier
	);

	// Spinner when the data is loading
	if (isLoading) return <Spinner />;

	if (!cabins.length) return <Empty resourceName='cabins' />;

	return (
		<Menus>
			<Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>

				{/* Render Props Pattern */}
				<Table.Body
					data={sortedCabins}
					render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
				/>
			</Table>
		</Menus>
	);
}

export default CabinTable;
