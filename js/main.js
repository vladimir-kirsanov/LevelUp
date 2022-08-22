

/* карусель  */
(function() {
	const carousel = {
		element: document.querySelector('#carousel'),
		previous: document.querySelector('#carousel .previous'),
		next: document.querySelector('#carousel .next'),
		images: document.querySelectorAll('#carousel li'),
		tick: 2,
		pause: 3000,
	}
	var carrent = 1;
	//инициализация
	for(let i = 0; i < carousel.images.length; ++i) {
		carousel.images[i].left = carousel.element.offsetWidth * i - carousel.element.offsetWidth;
		carousel.images[i].style.left = carousel.images[i].left + 'px';
		//console.log(carousel.images[i].style.left);
	}
	//анимация смещения
	let j = 0,
		step = carousel.element.offsetWidth;
	var dir = 'righ.t';

	function animationLeft() {
		if(j < step) {
			j += 2;
			for(let i = 0; i < carousel.images.length; ++i) {
				if(dir == 'left') {
					carousel.images[i].left -= 2;
				}
				if(dir == 'right') {
					carousel.images[i].left += 2;
				}
				carousel.images[i].style.left = carousel.images[i].left + 'px';
			}
			setTimeout(animationLeft, carousel.tick)
		} else {
			for(let i = 0; i < carousel.images.length; i++) {
				if((carrent < (carousel.images.length - 1)) && (carrent > 0)) {
					carousel.previous.style.display = "block";
					carousel.next.style.display = "block";
				}
				if(carrent == (carousel.images.length - 1)) {
					carousel.previous.style.display = "block";
					carousel.next.style.display = "none";
				}
				if(carrent == 0) {
					carousel.previous.style.display = "none";
					carousel.next.style.display = "block";
				}
				break;
			}
			j = 0;
		}
	} //animationLeft()
	
	carousel.next.onclick = function() {
		carrent = carrent + 1;
		dir = 'right';
		animationLeft();
		return false;
	}
	carousel.previous.onclick = function() {
		carrent = carrent - 1;
		dir = 'left';
		animationLeft();
		return false;
	}
})();

 /* таймер */    
document.getElementById("days").style.display = "none";
document.getElementById("hours").style.display = "none";

function getTimeRemaining(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));
	return {
		total: t,
		days: days,
		hours: hours,
		minutes: minutes,
		seconds: seconds
	};
}

function initializeClock(id, endtime) {
	var clock = document.getElementById(id);
	var daysSpan = clock.querySelector(".days");
	var hoursSpan = clock.querySelector(".hours");
	var minutesSpan = clock.querySelector(".minutes");
	var secondsSpan = clock.querySelector(".seconds");

	function updateClock() {
		var t = getTimeRemaining(endtime);
		if(t.total <= 0) {
			clearInterval(timeinterval);
			var deadline = new Date(Date.parse(new Date()) + 1801 * 1000);
			initializeClock('countdown', deadline);
		}
		//daysSpan.innerHTML = t.days;
		// hoursSpan.innerHTML = ("0" + t.hours).slice(-2); 
		minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
		secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
	}
	updateClock();
	var timeinterval = setInterval(updateClock, 1000);
}
var deadline = new Date(Date.parse(new Date()) + 1800 * 1000);
initializeClock("countdown", deadline);


/* анимация картинки   */
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
if(screenWidth > 450) {
	let bg = document.querySelector('.anim');
	window.addEventListener('mousemove', function(e) {
		let x = e.clientX / window.innerWidth;
		let y = e.clientY / window.innerHeight;
		bg.style.transform = 'translate(' + x * 90 + 'px,  ' + y * 90 + 'px)';
	});
}

/* скролл */
let anchorlinks = document.querySelectorAll('a[href^="#"]')
for(let item of anchorlinks) { // relitere 
	item.addEventListener('click', (e) => {
		let hashval = item.getAttribute('href')
		let target = document.querySelector(hashval)
		target.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
		history.pushState(null, null, hashval)
		e.preventDefault()
	})
}
