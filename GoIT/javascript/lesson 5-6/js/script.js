var stopwatch = {

	// Basic values of milliseconds, seconds, minutes and hours (and auxiliary variable for storage time during 'Pause')
	milliseconds: 0,
	seconds: 0,
	minutes: 0,
	hours: 0,

	initialTime: 0,
	timerId: 0,
	pausePressed: 0,
	frozenTime: 0,
	
	// DOM-elements
	elements: {
		milliseconds: document.querySelector('.milliseconds'),
		seconds: document.querySelector('.seconds'),
		minutes: document.querySelector('.minutes'),
		hours: document.querySelector('.hours'),
	},

	// Control buttons
	buttons: {
		startButton: document.getElementById('start'),
		splitButton: document.getElementById('split'),
		clearButton: document.getElementById('clear'),
	},

	runStopwatch: function(event) {
		// Determine initial count point by click on 'Start' button
		if (event) this.initialTime = Date.now(); 	
		this.timerId = setInterval(run, 1);

		var that = this;
		
		function run() {
			var currentTime = Date.now();

			// Amount of milliseconds since initial count point
			that.milliseconds = currentTime - that.initialTime - that.frozenTime - that.seconds * 1000 - that.minutes * 60 * 1000 + that.hours * 60 * 60 * 1000;

			if (that.milliseconds > 999) {

				that.milliseconds -= 1000;
				that.elements.milliseconds.innerHTML = that.milliseconds;

			// If second have passed (1000 ms) add one second by launching appropriate method
				secondsRun();
			} else {
				that.elements.milliseconds.innerHTML = that.milliseconds;
			}

			function secondsRun() {
				++that.seconds;

				if (that.seconds < 10) {
					that.elements.seconds.innerHTML = '0' + that.seconds;
				} else if (that.seconds > 59) {
					that.elements.seconds.innerHTML = '00';
					that.seconds = 0;
					
					// If 60 seconds have been accumulated, add one minute and reset seconds to 0 (further minutes and hours similarly)
					minRun();										

				}	else {
					that.elements.seconds.innerHTML = that.seconds;
				}
			}

			function minRun() {
				++that.minutes;

				if (that.minutes < 10) {
					that.elements.minutes.innerHTML = '0' + that.minutes;
				} else if (that.minutes > 59) {
					that.elements.minutes.innerHTML = '00';
					that.minutes = 0;
					
					hoursRun();
				} else {
					that.elements.minutes.innerHTML = that.minutes;
				}
			}

			function hoursRun() {
				++that.hours;

				if (that.hours < 10) {
					that.elements.hours.innerHTML = '0' + that.hours;
				} else {
					that.elements.hours.innerHTML = that.hours;
				}
			}
		};

		this.buttons.startButton.value = 'Stop';
		this.buttons.startButton.classList.remove('btn-primary');
		this.buttons.startButton.classList.add('btn-info');
	},

	pauseStopwatch: function() {
		clearInterval(this.timerId);
		this.pausePressed = Date.now();

		this.split();
		
		this.buttons.startButton.value = 'Continue';
		this.buttons.startButton.classList.remove('btn-info');
		this.buttons.startButton.classList.add('btn-success');
	},

	continueStopwatch: function() {
		// Define time of pause
		this.frozenTime += Date.now() - this.pausePressed;

		this.runStopwatch();
		
		this.buttons.startButton.value = 'Stop';
		this.buttons.startButton.classList.remove('btn-success');
		this.buttons.startButton.classList.add('btn-info');
	},

	clear: function() {
		clearInterval(stopwatch.timerId);
		
		// Counters set to zero
		stopwatch.milliseconds = 0;
		stopwatch.seconds = 0;
		stopwatch.minutes = 0;
		stopwatch.hours = 0;
		stopwatch.frozenTime = 0;

		// Reset HTML and deleting all measured intervals
		stopwatch.elements.milliseconds.innerHTML = '00';
		stopwatch.elements.seconds.innerHTML = '00';
		stopwatch.elements.minutes.innerHTML = '00';
		stopwatch.elements.hours.innerHTML = '00';

		document.querySelector('.intervals').innerHTML = '';

		// Refresh "Start/Pause/Continue" button
		stopwatch.buttons.startButton.value = 'Start';
		stopwatch.buttons.startButton.classList.remove('btn-success');
		stopwatch.buttons.startButton.classList.remove('btn-info');
		stopwatch.buttons.startButton.classList.add('btn-primary');
	},

	split: function(event) {
		if (stopwatch.buttons.startButton.value != 'Stop') return;

		var div = document.createElement('div');
		div.className = 'split';

		var millisec;
		
		if (stopwatch.milliseconds < 10) millisec = '00' + stopwatch.milliseconds;
		else if (stopwatch.milliseconds < 100) millisec = '0' + stopwatch.milliseconds;
		else millisec = stopwatch.milliseconds;

		// Check how the function was called: by 'click' event (event == true) or by execution of 'pauseStopwatch' method
		var context = event ? '.Split ' : '.Stop ';

		div.innerHTML = (document.querySelectorAll('.split').length + 1) + context + stopwatch.elements.hours.innerHTML + ':' + 
		stopwatch.elements.minutes.innerHTML + ':' + stopwatch.elements.seconds.innerHTML + '.' + millisec;
		document.querySelector('.intervals').appendChild(div);
	}
};


function handler() {

	switch (stopwatch.buttons.startButton.value) {

		case 'Start':
			stopwatch.runStopwatch(event);
			break;

		case 'Stop':
			stopwatch.pauseStopwatch();
			break;

		case 'Continue':
			stopwatch.continueStopwatch();
			break;
	}
};

stopwatch.buttons.startButton.addEventListener('click', handler);
stopwatch.buttons.clearButton.addEventListener('click', stopwatch.clear);
stopwatch.buttons.splitButton.addEventListener('click', stopwatch.split);