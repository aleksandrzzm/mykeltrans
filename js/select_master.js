
	const TICKET_COST = 12;
 	let selectedTickets = 1;

 	function getTotalCost() {
 		return TICKET_COST * selectedTickets;
 	}

 	function updateDisplayCost() {
 		document.getElementById('result-cost').innerText = getTotalCost()+''
 	}
 	function updateTicketCount() {
 		document.getElementById('result-tickets').innerText = selectedTickets+''
 	}

 	function updateDisplay() {
 		updateDisplayCost();
 		updateTicketCount();

 		if (selectedTickets > 1) {
 			document.getElementById('calculator-minus').disabled = false;
 		} else {
 			document.getElementById('calculator-minus').disabled = true;

 		}
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
  const number = (Math.floor(Math.random() * 999) + 460) + '' + (Math.floor(Math.random() * 999) + 100);
	document.location.href = '/bought.html?ticketCount='+selectedTickets+'&boughtTime='+(Math.floor(Date.now()/1000))+'&number='+number;
}
