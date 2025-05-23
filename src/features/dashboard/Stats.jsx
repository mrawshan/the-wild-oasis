import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from 'react-icons/hi2';

// features
import Stat from './Stat';

// utils
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
	// 01) Number of bookings
	const numBookings = bookings.length;

	// 02) Total sales
	const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

	// 03) Total check ins
	const checkins = confirmedStays.length;

	// 04) Occupancy rate
	// num of checked in  nights / all available nights (num of days * num of cabins)
	const occupation =
		confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
		(numDays * cabinCount);

	return (
		<>
			<Stat
				title='Bookings'
				color='blue'
				icon={<HiOutlineBriefcase />}
				value={numBookings}
			/>

			<Stat
				title='Sales'
				color='green'
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>

			<Stat
				title='Check ins'
				color='indigo'
				icon={<HiOutlineCalendarDays />}
				value={checkins}
			/>

			<Stat
				title='Occupancy rate'
				color='yellow'
				icon={<HiOutlineChartBar />}
				value={Math.round(occupation * 100) + '%'}
			/>
		</>
	);
}

export default Stats;
