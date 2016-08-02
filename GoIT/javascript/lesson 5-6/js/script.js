// Объявляем глобальные переменные - изначальная точка отсчета вермени (пока не задаем значение), значения секунд, минут, часов;

var initialTime, timerId;
var millisecValue = 0;
var secValue = 0;
var minValue = 0;
var hoursValue = 0;

// переменные соответсвующих DOM - элементов

var millisec = document.querySelector('.milliseconds');
var sec = document.querySelector('.seconds');
var min = document.querySelector('.minutes');
var hours = document.querySelector('.hours');

// переменные кнопок управления секундомером

var startButton = document.getElementById('start');
var clearButton = document.getElementById('clear');

// переменная определяющая состояние кнопки "Start/Pause/Continue"

var state = startButton.value;

function stopwatch() {
	
	var currentTime = new Date;

	// Рассчитываем количество миллисекунд от начальной точки отсчета
	
	millisecValue += currentTime.getTime() - initialTime.getTime();

	if (millisecValue > 999) {
			
		millisecValue -= 1000;
		millisec.innerHTML = millisecValue;
		initialTime = new Date;				// Если прошла секунда (1000 мс) устанавливаем новую точку отсчета
		secondsRun();									// и плюсуем секунду запуском соответсвующей функции

	} else {
		millisec.innerHTML = millisecValue;
		millisecValue = 0;
	}

	function secondsRun() {		
	
		++secValue;

		if (secValue < 10) {

			sec.innerHTML = '0' + secValue;

		} else if (secValue > 59) {
			
			sec.innerHTML = '00';
			secValue = 0;
			minRun();										// Накопилось 60 секунд - плюсуем минуту и сбарсываем секунды на 0 (далее минуты и часы по аналогии)

		}	else {
			sec.innerHTML = secValue;
		}
	};

	function minRun() {

		++minValue;

		if (minValue < 10) {

			min.innerHTML = '0' + minValue;

		} else if (minValue > 59) {

			min.innerHTML = '00';
			minValue = 0;
			hoursRun();

		} else {
			min.innerHTML = minValue;
		}
	};

	function hoursRun() {

		++hoursValue;

		if (hoursValue < 10) {

			hours.innerHTML = '0' + hoursValue;		// Значения суток и т.д. предусматривать не будем
																						// Но, в случае необходимости, руководствуясь описаной логикой легко можно добавить и дни
		} else {

			hours.innerHTML = hoursValue;

		}
	};
};

function runStopwatch() {
	
	initialTime = new Date; 									// При клике задаем значение начальной точки отсчета времени
	timerId = setInterval(stopwatch, 1);

	startButton.value = state = 'Pause';
	startButton.classList.remove('btn-primary');
	startButton.classList.add('btn-info');
};

function freezeStopwatch() {

	clearInterval(timerId);
	

	startButton.value = state = 'Continue';
	startButton.classList.remove('btn-info');
	startButton.classList.add('btn-success');
};

function continueStopwatch() {

	initialTime = new Date;
	timerId = setInterval(stopwatch, 1);

	startButton.value = state = 'Pause';
	startButton.classList.remove('btn-success');
	startButton.classList.add('btn-info');
};

function handler() {

	switch (state) {

		case 'Start':
			runStopwatch();
			break;

		case 'Pause':
			freezeStopwatch();
			break;

		case 'Continue':
			continueStopwatch();
			break;
	}
};

function clear() {

	clearInterval(timerId);
	
	// Обнуляем счетчики
	secValue = 0;
	minValue = 0;
	hoursValue = 0;
	
	// Обнуляем цифры в HTML
	millisec.innerHTML = '00';
	sec.innerHTML = '00';
	min.innerHTML = '00';
	hours.innerHTML = '00';
};


startButton.addEventListener('click', handler);
clearButton.addEventListener('click', clear);