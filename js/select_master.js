const TICKET_COST = 12;
let selectedTickets = 1;

function getTotalCost() {
  return TICKET_COST * selectedTickets;
}

function updateDisplayCost() {
  document.getElementById('result-cost').innerText = selectedTickets === 67 ? 'сыкс сэвэн' : (getTotalCost() + '')
}

function updateTicketCount() {
  document.getElementById('result-tickets').innerText = selectedTickets === 67 ? 'сыкс сэвэн' : (selectedTickets + '')
}

function updateDisplay() {
  updateDisplayCost();
  updateTicketCount();

  document.getElementById('calculator-minus').disabled = selectedTickets <= 1;
}

updateDisplay();

function plusTicket() {
  selectedTickets++;
  updateDisplay();
}

function minusTicket() {
  selectedTickets--;
  updateDisplay();
}

function buy() {
  const number = (Math.floor(Math.random() * 999) + 460).toString() + '' + (Math.floor(Math.random() * 999) + 100).toString();
  document.location.href = '/bought.html?ticketCount=' + selectedTickets + '&boughtTime=' + (Math.floor(Date.now() / 1000)) + '&number=' + number;
}
