const params = new URLSearchParams(window.location.search);

const ticketCount = Number(params.get('ticketCount') || 1);
const boughtTime = Number(params.get('boughtTime') || Math.floor(Date.now()/1000));
const ticketNumber = params.get('number') || '462486';

const totalSeconds = (60 + 30) * 60;
const warningTime = 60;
const dangerTime = 30;


function updateTicketCountDisplay() {
	document.getElementById('ticket-count').innerText = ticketCount + '';
	document.getElementById('ticket-count-description').innerText = formatTickets(ticketCount);
}

function updateTicketId() {
  document.getElementById('ticket-id').innerText = ticketNumber.substring(0, 3)+' '+ticketNumber.substring(3);
}

updateTicketId()

function updateTicketDangerity() {
	const leftMinutes = getLeftSeconds() / 60;

	if (leftMinutes < dangerTime) {
		document.getElementById('ticket-timer-wrapper').setAttribute('style', '--border-timer: #F7C0BE; --background-timer: linear-gradient(91deg, rgba(247, 192, 190, 0.50) 0%, rgba(237, 193, 224, 0.50) 100%); --ring-color: #C63231; --progress-color: #F7C0BE; --background-border-timer: linear-gradient(91deg, rgba(247, 192, 190, 1) 0%, rgba(237, 193, 224, 1) 100%);')
	} else if(leftMinutes < warningTime) {
		document.getElementById('ticket-timer-wrapper').setAttribute('style', '--border-timer: #ECC8A0; --background-timer: linear-gradient(91deg, rgba(236, 200, 160, 0.50) 0%, rgba(236, 211, 160, 0.50) 100%); --ring-color: #D68117; --progress-color: #ECC8A0; --background-border-timer: linear-gradient(91deg, rgba(236, 200, 160, 1) 0%, rgba(236, 211, 160, 1) 100%);')
	} else {
		document.getElementById('ticket-timer-wrapper').setAttribute('style', '--border-timer: #ACDABD; --background-timer: linear-gradient(91deg, rgba(172, 218, 189, 0.50) 0%, rgba(170, 212, 248, 0.50) 100%); --ring-color: #17954D; --progress-color: #ACDABD; --background-border-timer: linear-gradient(91deg, rgba(172, 218, 189, 1) 0%, rgba(170, 212, 248, 1) 100%); --min-width: 240px;')
	}

}

function updateDateDisplay() {
	const date = new Date(boughtTime * 1000);

const formatted = new Intl.DateTimeFormat('uk-UA', {
	day: 'numeric',
	month: 'long'
}).format(date);
const time = new Intl.DateTimeFormat('uk-UA', {
	hour: '2-digit',
	minute: '2-digit',
	hour12: false
}).format(date);

console.log(formatted);
document.getElementById('ticket-bought-date').innerText = formatted;
document.getElementById('ticket-bought-time').innerText = time;
}

function getLeftSeconds() {
	return totalSeconds - (Math.floor(Date.now() / 1000) - boughtTime);
}

function getRelativeHours() {
	const left = Math.max(0, getLeftSeconds());
	return Math.floor(left / 3600);
}

function getRelativeMinutes() {
	const left = Math.max(0, getLeftSeconds());
	return Math.floor((left % 3600) / 60);
}

function getRelativeSeconds() {
	const left = Math.max(0, getLeftSeconds());
	return left % 60;
}


function updateTimerDiplay() {
	document.getElementById('ticket-timer').innerText = (getRelativeHours() > 0 ? getRelativeHours()+':' : '')+(getRelativeMinutes() + '').padStart(2, '0')+':'+(getRelativeSeconds()+'').padStart(2, '0');

}
	updateTimerDiplay();
	updateTicketDangerity();

setInterval(() => {
	updateTimerDiplay();
	updateTicketDangerity();
}, 500);

updateDateDisplay()
updateTicketCountDisplay();

function formatTickets(count) {
	const mod10 = count % 10;
	const mod100 = count % 100;

	if (mod10 === 1 && mod100 !== 11) {
		return `квиток`;
	}

	if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
		return `квитка`;
	}

	return `квитків`;
}
