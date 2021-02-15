const seatsForm = document.querySelector('#tickets');
const seatsCart = document.querySelector('#cart-tickets');
const cartTotal = document.querySelector('#cart-total');
const confirmButton = document.querySelector('#cart-confirm');
const cancelButton = document.querySelector('#cart-cancel');
const modal = document.querySelector('#modal');
const modalConfirmButton = modal.querySelector('#modal-confirm');
const modalCancelButton = modal.querySelector('#modal-cancel');
const modalTotal = modal.querySelector('#modal-total');
const modalTickets = modal.querySelector('#modal-tickets');
const selectedSeats = [];
const PRICE = 5;

const createSelectedSeatsTemplates = (selectedSeats) => {
	const templates = selectedSeats.map((seat) => {
		return `<li class="selected-seats__ticket">
                    <p class="ticket__location">${seat}</p>
                    <p class="ticket__price">$${PRICE.toFixed(2)}</p>
                </li>`;
	});
	return templates;
};

const addSeat = (seatToAdd, selectedSeats) => {
	selectedSeats.push(seatToAdd);
};

const showTotal = () => {
	let total = (PRICE * selectedSeats.length).toFixed(2);
	cartTotal.textContent = `Total: $${total}`;
};

const updateCart = (selectedSeats) => {
	let seats = createSelectedSeatsTemplates(selectedSeats);
	seatsCart.innerHTML = '';
	seats.forEach((seat) => {
		seatsCart.innerHTML += seat;
	});
	if (seats.length === 0) {
		seatsCart.innerHTML = '<p class="cart__empty">No seats selected yet</p>';
	}
	showTotal();
};

const clearSelected = (selectedSeats) => {
	selectedSeats.length = 0;
};

const removeSeat = (seatToRemove, selectedSeats) => {
	let index = selectedSeats.indexOf(seatToRemove);
	selectedSeats.splice(index, 1);
};

const rejectModal = () => {
	modalTickets.textContent = 'No seats selected';
	modalConfirmButton.style.display = 'none';
};

const fillModal = (selectedSeats) => {
	let seats = selectedSeats.length;
	let total = (seats * PRICE).toFixed(2);
	modalTickets.textContent = `Seats: ${seats}`;
	modalTotal.textContent = `Total: $${total}`;
	modalConfirmButton.style.display = 'block';
};

const updateModal = (selectedSeats) => {
	if (selectedSeats.length) {
		fillModal(selectedSeats);
	} else {
		rejectModal();
	}
};

const showModal = () => {
	modal.style.display = 'flex';
};

const hideModal = () => {
	modal.style.display = 'none';
};

seatsForm.addEventListener('click', ({ target }) => {
	let seat = target.closest('.seat__input');
	if (seat) {
		if (seat.checked) {
			addSeat(seat.value, selectedSeats);
		} else {
			removeSeat(seat.value, selectedSeats);
		}
		updateCart(selectedSeats);
	}
});

confirmButton.addEventListener('click', () => {
	updateModal(selectedSeats);
	showModal();
});

cancelButton.addEventListener('click', () => {
	clearSelected(selectedSeats);
	updateCart(selectedSeats);
});

modalCancelButton.addEventListener('click', () => {
	hideModal();
});
