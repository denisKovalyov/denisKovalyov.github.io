// Exponentiation

var x, n;

function dataInput() {
	x = parseInt( prompt('Введите число для возведения в степень', '') );
	
	if (isNaN(x)) {
		do {
			x = parseInt( prompt('Пожалуйста, введите числовое значение', '') );
		} while (isNaN(x));
	};

	n = parseInt( prompt('Введите степень', '') );
	
	if (isNaN(n)) {
		do {
			n = parseInt( prompt('Пожалуйста, введите числовое значение', '') );
		} while (isNaN(n));
	} 
};

function pow(base, exponent) {
	
	var result = 1;

	if (exponent > 0) {
	for (i = 0; i < exponent; i++) {
		result *=base;
	};
	} else {
		for (i = 0; i > exponent; i--) {
		result *=base;
	}; 
	result = 1/result;
	};
	console.log(base + ' в степени '+ exponent + ' равно: ', result)
};

function exponentiation() {
	dataInput ();
	pow (x,n);
};

// Arrays and loops

function arrayFilling() {
	
	var array = [];
	
	for (var i = 0; i < 5; i++) {
		array.push( prompt('Введите имя № ' + (i+1), '') );
	};

	var userName = prompt('Введите имя пользователя', '');
	var flag = false;

	for (var j = 0; j < array.length; j++) {
		if (array[j] === userName) {
			flag = true;
			break;
		};
	};

	if (flag) {
			alert(userName + ', вы успешно вошли.');
		} else {
			alert('Извините, такого пользователя не существует.');
	};
};


