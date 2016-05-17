// Exponentiation

var x, n, result;

function exponentiation() {
	if(!dataEntering()) return;
	pow(x, n);
	display();
}

function dataEntering() {
	x = prompt('Введите число для возведения в степень или нажмите "Отмена"', '');
	x = validation(x);
	if(!x && x !== 0) return;

	n = prompt('Введите степень', '');
	n = validation(n);
	if(!n && n !== 0) return;

	return true;
}

function validation(n) {
	if (isNaN(+n) || n === '') {
		do {
			n = prompt('Пожалуйста, введите корректное числовое значение или нажмите "Отмена"', '');
		} while (isNaN(+n) || n === '');
	};

	if (n === null) return;
	return +n;
}

function pow(base, exponent) {
	result = 1;
	
	if (exponent > 0) {
		for (i = 0; i < exponent; i++) {
			result *=base;
		}
	} else if (exponent === 0 && base === 0) {
		result = 'Выражение лишено смысла';
	} else {
		for (i = 0; i > exponent; i--) {
			result *=base;
		}
		result = 1/result;
	}
	return result;
}

function display() {
	console.log(x + ' в степени '+ n + ' равно: ' + result);
}

// Arrays and loops

var array = [];

var userName, flag = false;

function userNameCheck() {
	arrayFilling();
	userNameEntering();
	determineFlag();
	accessCheck();
}

function arrayFilling() {
	for (var i = 0; i < 5; i++) {
		array.push( prompt('Введите имя № ' + (i+1), '') );
	}
}

function userNameEntering() {
	userName = prompt('Введите имя пользователя', '');
}

function determineFlag() {
	for (var i = 0; i < array.length; i++) {
		if (array[i] === userName) {
			flag = true;
			break;
		}
	}
}

function accessCheck() {
	if (flag) {
			alert(userName + ', вы успешно вошли.');
		} else {
			alert('Извините, такого пользователя не существует.');
		}
}