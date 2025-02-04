import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HiArrowUpOnSquare, HiTrash } from 'react-icons/hi2';

// Custom hook
import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBooking';

// features
import BookingDataBox from './BookingDataBox';

// ui components
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Empty from '../../ui/Empty';

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const navigate = useNavigate();

	// Custome hooks
	const { booking, isLoading } = useBooking();
	const { checkout, isCheckingOut } = useCheckout();
	const { deleteBooking, isDeleting } = useDeleteBooking();
	const moveBack = useMoveBack();

	if (isLoading) return <Spinner />;
	if (!booking) return <Empty resourceName='booking' />;

	const { status, id: bookingId } = booking;

	const statusToTagName = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	};

	return (
		<>
			<Row type='horizontal'>
				<HeadingGroup>
					<Heading as='h1'>Booking #{bookingId}</Heading>
					<Tag type={statusToTagName[status]}>
						{status.replace('-', ' ')}
					</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<Menus>
				<ButtonGroup>
					{/* For check in */}
					{status === 'unconfirmed' && (
						<Button onClick={() => navigate(`/checkin/${bookingId}`)}>
							Check in
						</Button>
					)}

					{/* For checkout */}
					{status === 'checked-in' && (
						<Button
							icon={<HiArrowUpOnSquare />}
							onClick={() => {
								checkout(bookingId);
							}}
							disabled={isCheckingOut}
						>
							Check out
						</Button>
					)}

					<Modal>
						{/* Delete */}
						{status === 'unconfirmed' && (
							<Modal.Open opens='delete'>
								<Button variation='danger' icon={<HiTrash />}>
									Delete booking
								</Button>
							</Modal.Open>
						)}

						{/* Modal window confirmation for delete */}
						<Modal.Window name='delete'>
							<ConfirmDelete
								resourceName='booking'
								onConfirm={() => {
									moveBack();
									deleteBooking(bookingId);
								}}
								disabled={isDeleting}
							/>
						</Modal.Window>
					</Modal>

					<Button variation='secondary' onClick={moveBack}>
						Back
					</Button>
				</ButtonGroup>
			</Menus>
		</>
	);
}

export default BookingDetail;
