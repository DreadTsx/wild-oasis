import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  font-family: "Sono";
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
  white-space: nowrap;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
  white-space: nowrap;
`;

// Below 600px, turn the six columns (image, name, capacity, price, discount,
// menu) into a small card: image on the left spanning the height, name +
// menu button on the top line, capacity below it, price/discount on the
// last line. Same six children, same source order -- just re-targeted by
// position with grid-template-areas.
const StyledCabinRow = styled(Table.Row)`
  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 6.4rem 1fr auto;
    grid-template-areas:
      "img name menu"
      "img capacity capacity"
      "img price discount";
    row-gap: 0.4rem;
    column-gap: 1.2rem;

    & > *:nth-child(1) {
      grid-area: img;
      align-self: center;
    }
    & > *:nth-child(2) {
      grid-area: name;
      font-size: 1.5rem;
      align-self: end;
    }
    & > *:nth-child(3) {
      grid-area: capacity;
      font-size: 1.3rem;
      color: var(--color-grey-500);
      align-self: start;
    }
    & > *:nth-child(4) {
      grid-area: price;
      align-self: center;
    }
    & > *:nth-child(5) {
      grid-area: discount;
      justify-self: start;
      align-self: center;
    }
    & > *:nth-child(6) {
      grid-area: menu;
      justify-self: end;
      align-self: start;
    }
  }
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of the ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <StyledCabinRow>
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
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </StyledCabinRow>
  );
}

export default CabinRow;
