const seatsForm = document.querySelector('#tickets');
const seatsCart = document.querySelector('.cart__tickets');
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

const updateCart = (selectedSeats) => {
	let seats = createSelectedSeatsTemplates(selectedSeats);
    seatsCart.innerHTML = '';
    seats.forEach((seat) => {
        seatsCart.innerHTML += seat;
    });
    if (seats.length === 0) {
        seatsCart.innerHTML = '<p class="cart__empty">No seats selected yet</p>';
    }
};

const removeSeat = (seatToRemove, selectedSeats) => {
    let index = selectedSeats.indexOf(seatToRemove);
    selectedSeats.splice(index, 1);
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
