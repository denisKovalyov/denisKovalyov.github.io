/* First version of script

var generateHtml = {
	h1: function() {
		var h1 = document.createElement('h1');
		h1.className = 'text-center';
		h1.innerHTML = 'Тест по программированию';
		document.body.insertBefore(h1, document.body.firstChild);
	},

	form: function() {
		var form = document.createElement('form');
		form.setAttribute('action', '/');
		form.setAttribute('name', 'testAnswers');
		document.body.insertBefore(form, document.body.children[1]);
	},

	list: function() {
		var list = document.createElement('ol');
		for (var i = 1; i <= 3; i++) {
			list.innerHTML += '<li>' + '<strong>Вопрос №'+i+'</strong></li>';
		};
		document.body.querySelector('form').appendChild(list);
	},

	enclosedLists: function() {
		var listItems = document.body.querySelector('ol').children;
		
		for (var i = 0; i < listItems.length; i++) {
			var ul = document.createElement('ul');
			ul.className = 'list-unstyled';
			listItems[i].appendChild(ul);

			for (var j = 1; j <= 3; j++) {
				var li = document.createElement('li');
				ul.appendChild(li);

				var input = document.createElement('input');
				input.setAttribute('type', 'checkbox');
				input.setAttribute('value', j);
				input.setAttribute('name', 'quest'+(i+1)+'Answer'+j);
				input.setAttribute('id', 'quest'+(i+1)+'Answer'+j);

				var label = document.createElement('label');
				label.setAttribute('for', 'quest'+(i+1)+'Answer'+j);
				label.innerHTML = 'Вариант ответа №'+j;

				li.appendChild(input);
				li.appendChild(label);
			};
		};
	},

	button: function() {
		var button = document.createElement('input');
		button.setAttribute('type', 'submit');
		button.setAttribute('value', 'Проверить мои результаты');
		button.setAttribute('id', 'submit');
		button.className = 'btn btn-primary btn-lg center-block';
		document.querySelector('form').appendChild(button);
	},
};

function generateDOM(obj) {
	for (var key in obj) {
		obj[key]();
	}
	var button = document.body.querySelector('button');
	document.body.removeChild(button);
};*/

var app = {

	createElement: function(parameters) {
		var element = document.createElement(parameters.tagName);
		var placeForInsert = parameters.placeForInsert || null;

		if (parameters.className) {
			element.className = parameters.className;
		};

		if (parameters.content) {
			element.innerHTML = parameters.content;
		};

		if (parameters.attributes) {
			
			for (var key in parameters.attributes) {
				element.setAttribute(key, parameters.attributes[key]);
			}
		};

		if (parameters.parentElement) {
			parameters.parentElement.insertBefore(element, placeForInsert);
		};

		return element;
	},

	generateQuestions: function(questionsAmount, answersAmount) {
		
		var form = app.createElement({
	  	tagName: 'form',
	  	attributes: {
	  	action: '/',
	  	name: 'testAnswers',
	  	},
	  	parentElement: body,
		});

		var list = this.createElement({
			tagName: 'ol',
			parentElement: form,
		});

		for (var i = 0; i < questionsAmount; i++) {

			var li = this.createElement({
				tagName: 'li',
				className: 'bold',
				content: 'Вопрос №' + (i + 1),
				parentElement: list,
			});

			var ul = this.createElement({
				tagName: 'ul',
				className: 'list-unstyled',
				parentElement: li,
			});

			for (var j = 0; j < answersAmount; j++) {
				
				var insertedLi = this.createElement({
					tagName: 'li',
					className: 'checkbox',
					parentElement: ul,
				});

				var label = this.createElement({
					tagName: 'label',
					content: 'Варинат ответа №' + (j + 1),

					parentElement: insertedLi,
				});

				this.createElement({
				tagName: 'input',
				attributes: {
					type: 'checkbox',
					value: 'question#' + (i + 1) + 'answer#' + (j + 1),
				},
				parentElement: label,
				placeForInsert: label.firstChild,
				});
			};

		};

	},

};

var body = document.querySelector('body');

function generateDOM() {

	app.createElement({
	  tagName: 'h1',
	  className: 'text-center',
	  content: 'Тест по программированию',
	  parentElement: body,
	});

	app.generateQuestions(3, 3);

	app.createElement({
	  tagName: 'input',
	  inputType: 'submit',
	  className: 'btn btn-primary btn-lg center-block',
	  attributes: {
	  	type: 'submit',
	  	value: 'Проверить мои резульаты',
	  },
	  parentElement: document.documentElement.querySelector('form'),
	});

	body.removeChild(document.body.querySelector('button'));

};