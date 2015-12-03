// Exponentiation

var x, n;

function exponentiation() {
	dataEntering ();
	validation();
	pow (x,n);
}

function dataEntering() {
	x = parseInt( prompt('Введите число для возведения в степень', '') );
	n = parseInt( prompt('Введите степень', '') );
}

function validation() {
	if (isNaN(x)) {
		do {
			x = parseInt( prompt('Пожалуйста, введите корректное значение числа для возведения в степень', '') );
		} while (isNaN(x));
	}

	if (isNaN(n)) {
		do {
			n = parseInt( prompt('Пожалуйста, введите числовое значение степени', '') );
		} while (isNaN(n));
	}
}

function pow(base, exponent) {
    var result = 1;

	if (exponent > 0) {
	for (i = 0; i < exponent; i++) {
		result *=base;
	}
	} else {
		for (i = 0; i > exponent; i--) {
		result *=base;
	}
	result = 1/result;
	}

	console.log(base + ' в степени '+ exponent + ' равно: ', result);
}


// Arrays and loops

var array = [];

var userName, flag = false;

function unitedFunctionForUserNameCheck() {
	arrayFilling();
	userNameEntering();
	determineFlag();
	userNameCheck();
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
	for (var j = 0; j < array.length; j++) {
		if (array[j] === userName) {
			flag = true;
			break;
		}
	}
}

function userNameCheck() {
	if (flag) {
			alert(userName + ', вы успешно вошли.');
		} else {
			alert('Извините, такого пользователя не существует.');
		}
}


