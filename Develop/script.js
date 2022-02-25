// get main container
let container = $('main.container');

// get moment.js info
let weekday = moment().format('dddd');
let dateString = moment().format('LL');
let currentTime = moment();

// create hour block array
let timeArr = [
	moment('9 AM', 'h A'),
	moment('10 AM', 'h A'), 
	moment('11 AM', 'h A'), 
	moment('12 PM', 'h A'),
	moment('1 PM', 'h A'),
	moment('2 PM', 'h A'),
	moment('3 PM', 'h A'),
	moment('4 PM', 'h A'),
	moment('5 PM', 'h A')
];

// have header show current week day and full date
$('.title h1').html('<h1 class="mb-0"><span>' + weekday + ' </span>' + dateString + '</h1>');


// loop through timeArr elements
timeArr.forEach(function(i) {
	
	// create hour block container
	let timeBlock = $('<section>').addClass('hour-block row');
	if (currentTime.format('h A') === i.format('h A')) {
		timeBlock.addClass('current');
	} else if (currentTime.isBefore(i)) {
		timeBlock.addClass('future');
	}
	
	// create time container
	let timeContainer = $('<article>').addClass('time col col-small');
	
	// create circle
	let circle = $('<div>').addClass('circle');
	
	// create hour block time
	let hour = $('<div>').addClass('hour').text(i.format('h A'));
	
	// create event form
	let form = $('<form>').attr('method', 'post').addClass('col');
	
	// create textarea within form
	let textarea = $('<textarea>').attr('id', 'time-' + i.format('hA'));
	
	// if events are stored, output them on page load
	let storageName = i.format('h A');
	let stored = localStorage.getItem(storageName);
	let height = localStorage.getItem(storageName + ' height');
	if (stored !== null) {
		textarea.val(stored).height(parseInt(height) + 20);
	}
	
	// adjusts textarea height if you input multiple lines
	textarea.on('input', function() {
		if ( $(this).val() !== '' ) {
			$(this).css('height', $(this).prop('scrollHeight') + 'px');
		} else {
			$(this).css('height', '40px');
		}
	});
	
	// allows you to shift+return in the textarea, but return submits the form
	textarea.keypress(function (event) {
	    if(event.which == 13 && !event.shiftKey) {        
	        $(this).closest('form').submit();
	        event.preventDefault();
	    }
	});
	
	// on form submit, send value of textarea to local storage
	form.on('submit', function(event) {
		event.preventDefault();		
		let storedTime = textarea.val();
		if (storedTime === '') { 
			return;
		}		
		let textareaHeight = textarea.height();
		localStorage.setItem(storageName + ' height', textareaHeight);
		localStorage.setItem(storageName, storedTime);
	});
	
	// on form change, send value of textarea to local storage
	form.on('change', function(event) {
		event.preventDefault();
		let storedTime = textarea.val();
		if (storedTime === '') { 
			return;
		}		
		let textareaHeight = textarea.height();
		localStorage.setItem(storageName + ' height', textareaHeight);
		localStorage.setItem(storageName, storedTime);
	});
	
	// append all items
	form.append(textarea);
	timeContainer.append(circle, hour);
	timeBlock.append(timeContainer, form);
	container.append(timeBlock);
	
});

// add border bottom to last block in loop
$('#time-5PM').parent().css('border-bottom', '1px solid #ebebeb');



// get current, before, and after hours number
let currentHour = currentTime.hour();
let startHour = moment('9:00:00 AM', 'HH:mm:ss a').hour();
let endHour = moment('6:00:00 PM', 'HH:mm:ss a').hour();

// change data if before, after, or during work hours
if (currentHour < startHour) {
	
	$('header').css('background', '#000c4f');
	$('img').attr('src', './images/day-night.svg');
	
	let alert = $('<p>').attr('id', 'after-hours');
	alert.text('Not quite time to work yet! Check back at 9 AM.');
	$('main.container').append(alert);
	
} else if (currentHour >= endHour) {
	
	$('header').css('background', '#000c4f');
	$('img').attr('src', './images/day-night.svg');
	
	let alert = $('<p>').attr('id', 'after-hours');
	alert.text('Good job today, see you tomorrow at 9 AM.');
	$('main.container').append(alert);
	
} else {
	
	$('header').css('background', '#3B59FF');
    $('img').attr('src', './images/day-night.svg');
	$('#six .circle').css('background', '#3B59FF');
	$('#six .hour').css('color', '#1e1e1e');
	
}