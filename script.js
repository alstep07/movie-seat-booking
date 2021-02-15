const seatsForm = document.querySelector('#tickets');
const seatsCart = document.querySelector('.cart__tickets');
const cartTotal = document.querySelector('.cart__total');
const confirmButton = document.querySelector('.cart-btn--submit');
const cancelButton = document.querySelector('.cart-btn--cancel');
const modal = document.querySelector('#modal');
const modalConfirmButton = modal.querySelector('.modal__confirm');
const modalCancelButton = modal.querySelector('.modal__cancel');
const selectedSeats = [];
const PRICE = 5;

const createSelectedSeatsTemplates = (selectedSeats) => {
	const templates = selectedSeats.map((seat) => {
		return `<li class="selected-seats__ticket">
                    <p class="ticket__location">${seat}</p>
                    <p class="ticket__price">$ ${PRICE.toFixed(2)}</p>
                </li>`;
	});
	return templates;
};

const addSeat = (seatToAdd, selectedSeats) => {
	selectedSeats.push(seatToAdd);
};

const showTotal = () => {
    let total = (PRICE * selectedSeats.length).toFixed(2);
    cartTotal.textContent = `Total: $ ${total}`;
}

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
}

const removeSeat = (seatToRemove, selectedSeats) => {
    let index = selectedSeats.indexOf(seatToRemove);
    selectedSeats.splice(index, 1);
}

const showModal = () => {
    modal.style.display = "flex";
}

const hideModal = () => {
    modal.style.display = "none";
}

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
    showModal();
})

cancelButton.addEventListener('click', () => {
    clearSelected(selectedSeats);
    updateCart(selectedSeats);
});

modalCancelButton.addEventListener('click', () => {
    hideModal();
})
