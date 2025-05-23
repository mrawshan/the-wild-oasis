import styled from 'styled-components';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

// Custom hook
import { useDeleteCabin } from './useDeleteCabin';
import { useCreateCabin } from './useCreateCabin';

// utils
import { formatCurrency } from '../../utils/helpers';

// features
import CreateCabinForm from './CreateCabinForm';

// ui components
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

// const TableRow = styled.div`
// 	display: grid;
// 	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
// 	column-gap: 2.4rem;
// 	align-items: center;
// 	padding: 1.4rem 2.4rem;

// 	&:not(:last-child) {
// 		border-bottom: 1px solid var(--color-grey-100);
// 	}
// `;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
	// Delete cabin
	const { isDeleting, deleteCabin } = useDeleteCabin();

	// To duplicate cabin
	const { isCreating, createCabin } = useCreateCabin();

	// Destructuring the cabin
	const {
		id: cabinId,
		name,
		maxCapacity,
		regularPrice,
		discount,
		image,
		description,
	} = cabin;

	// Handler function
	function handleDuplicate() {
		createCabin({
			name: `Copy of ${name}`,
			maxCapacity,
			regularPrice,
			discount,
			image,
			description,
		});
	}

	return (
		<Table.Row>
			<Img src={image} />
			<Cabin>{name}</Cabin>
			<div>Fits up to {maxCapacity} guests</div>
			<Price>{formatCurrency(regularPrice)}</Price>
			{discount ? (
				<Discount>{formatCurrency(discount)}</Discount>
			) : (
				<span>&mdash;</span>
			)}
			<div>
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={cabinId} />

						<Menus.List id={cabinId}>
							{/* Duplicate cabin */}
							<Menus.Button
								icon={<HiSquare2Stack />}
								onClick={() => handleDuplicate()}
								disabled={isCreating}
							>
								Duplicate
							</Menus.Button>

							{/* Edit cabin */}
							<Modal.Open opens='edit'>
								<Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
							</Modal.Open>

							{/* Delete cabin */}
							<Modal.Open opens='delete'>
								<Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
							</Modal.Open>
						</Menus.List>

						{/* Modal window for edit */}
						<Modal.Window name='edit'>
							<CreateCabinForm cabinToUpdate={cabin} />
						</Modal.Window>

						{/* Modal window confirmation for delete */}
						<Modal.Window name='delete'>
							<ConfirmDelete
								resourceName='cabins'
								onConfirm={() => deleteCabin(cabinId)}
								disabled={isDeleting}
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</div>
		</Table.Row>
	);
}

export default CabinRow;
