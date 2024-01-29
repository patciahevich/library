const myPoints = function () {
    console.log( 
    "Самооценка - 198 баллов"
);
}

myPoints()

// add burger menu
'use strict'

const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');
const body = document.querySelector('body')

// меню открывается с помощью кнопки 

function openMenu (event) {
	event.stopPropagation();
	closeProfile()
	menuBtn.classList.toggle('active');
	nav.classList.toggle('active');
	// body.classList.toggle('locked')
	
}

menuBtn.addEventListener('click', openMenu)


// меню закрывается при нажатии на навигацию

function closeMenu() {
	nav.classList.remove('active')
	body.classList.remove('locked')
	menuBtn.classList.remove('active');
}

nav.addEventListener('click', closeMenu)

const main = document.querySelector('main')

main.addEventListener('click', function () {
		closeMenu()
		closeProfile()
})

// add slider 

const sliderImg = document.querySelectorAll(".slider_item");
const sliderContent = document.querySelector(".slider_content");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const sliderPoints = document.querySelectorAll(".point");

const screenWidth = window.screen.width
const sliderWidth = document.querySelector(".slider_container").offsetWidth;
const arrows = document.querySelectorAll('.arrow')


let sliderCount = 0;

// Если слайдер доходит до конца, дальше его пролистать нельзя
// Стрелке устанавливаю свойство disabled

function makeDisabled (btn, arrowIndex) {
	btn.setAttribute("disabled", true);
	arrows[arrowIndex].classList.add('disabled')

}

function nextSlide () {
	prevBtn.removeAttribute("disabled")
	arrows.forEach(item => item.classList.remove('disabled'))

	sliderCount++
	if (sliderCount >= sliderImg.length - 1) {
		sliderCount = sliderImg.length - 1;
		makeDisabled(nextBtn, 0)
	}

	rollSlider();
	thisSlide(sliderCount);
}

function prevSlide () {
	nextBtn.removeAttribute("disabled")
	arrows.forEach(item => item.classList.remove('disabled'))

	sliderCount--
	if (sliderCount < 1) {
		sliderCount = 0;
		makeDisabled(prevBtn, 1)
	} 

	rollSlider();
	thisSlide(sliderCount);	
}

let num = 0;

function rollSlider () {
	if (screenWidth <= 1420 && screenWidth > 1027) {
		num = -(450 * sliderCount) - (25 *sliderCount);
	} else if (screenWidth <= 1027) {
		num = -(450 * sliderCount) - (25 * (sliderCount));
	} else {
		num = -(450 * sliderCount) - (25 * (sliderCount));
	}
	sliderContent.style.transform = `translateX(${num}px)`
	
}

function thisSlide(index) {
	sliderPoints.forEach( function(item) {
		item.classList.remove('active_point');
		item.removeAttribute('disabled')
	});
	sliderPoints[index].classList.add('active_point');
	sliderPoints[index].setAttribute('disabled', true);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

sliderPoints.forEach( function (point, index) {
	point.addEventListener('click', function() {
			nextBtn.removeAttribute("disabled")
			prevBtn.removeAttribute('disabled')
			arrows.forEach(item => item.classList.remove('disabled'))

			sliderCount = index;

			rollSlider();
			thisSlide(sliderCount);	

			if (sliderCount === 0) {
				makeDisabled(prevBtn, 1)
			} else if (sliderCount === sliderImg.length - 1) {
				makeDisabled(nextBtn, 0)
			}
	})
})



// делаем секцию favorites

const seasons = document.querySelectorAll('.check_season');
const radioBtns = document.querySelectorAll('.radio');
const pickSeason = document.querySelector('.pick_season')

radioBtns[0].checked = true;


function checkSeason () {
	for (let i = 0; i < radioBtns.length; i++) {
		if (radioBtns[i].checked == true) {
			return i
		}
	}
	
}


checkSeason()

seasons.forEach(function (season) {
	season.addEventListener('click', function () {
		let num = checkSeason()
		showSeason(num)
	})
})



const seasonsDict = {
	0: '.winter',
	1: '.spring',
	2: '.summer',
	3: '.autumn',
}

function showSeason (num) {
	seasons.forEach(function(item, index, array) {
		document.querySelector(seasonsDict[index]).classList.remove('fadeIn');
		setTimeout(function () {
			document.querySelector(seasonsDict[index]).classList.remove('activeSeason');
			document.querySelector(seasonsDict[num]).classList.add('activeSeason');
		}, 500)
	})
	
	setTimeout(function() {
		document.querySelector(seasonsDict[num]).classList.add('fadeIn');
	}, 600)
}

// этап регистрации
const wrongUser = document.querySelectorAll('.wrong_user')
const account = document.querySelector('.account')
const profileBefore = document.querySelector('.before_registration');
const profileAfter = document.querySelector('.after_registration')

account.addEventListener('click', function() {
	closeMenu()
	profileBefore.classList.toggle('open')
})

const registerBtns = document.querySelectorAll('.registerButton')
const loginBtns = document.querySelectorAll('.loginButton')
const registerArea = document.querySelector('.register-card')
const loginArea = document.querySelector('.login-card')
const modalWindow = document.querySelector('.modal')
const popUpBtn = document.querySelectorAll('.close_window')

function openCard (card) {
	modalWindow.classList.add('active');
	card.classList.add('open')
	setTimeout(function () {
		card.classList.add('fadeIn')
	}, 100)
}
function closeProfile () {
	profileBefore.classList.remove('open');
	profileAfter.classList.remove('open')
}

function closeCard () {
	resetForm();
	formReq.forEach(function(item, index) {
		formRemoveError(item, index);
	})

	registerArea.classList.remove('error')	
	loginArea.classList.remove('error')
	wrongUser.forEach(item => item.classList.remove('error'))
	registerArea.classList.remove('fadeIn')
	registerArea.classList.remove('open')
	loginArea.classList.remove('fadeIn')
	loginArea.classList.remove('open')
	buyCardArea.classList.remove('open');
	buyCardArea.classList.remove('fadeIn')
	modalWindow.classList.remove('active')
}

registerBtns.forEach(item => item.addEventListener('click', function(event) {
	event.stopPropagation()
	closeProfile();
	closeCard();
	openCard(registerArea);
}))
loginBtns.forEach(item => item.addEventListener('click', function(event) {
	event.stopPropagation()
	closeProfile();
	closeCard();
	openCard(loginArea);
}))
popUpBtn.forEach(function (item) {
	item.addEventListener('click', closeCard)
})


const myProfileButton = document.querySelectorAll('.my_profile_button')
const myProfile = document.querySelector('.my_profile');
const copyButton = document.querySelector('.copy_btn')

myProfileButton.forEach(function (item) {
	item.addEventListener('click', function(e) {
		e.stopPropagation()
		closeProfile();
		showMyProfile()
	});
})

copyButton.addEventListener('click', function () {
	navigator.clipboard.writeText(`${cardNumber.textContent}`)
})
function showMyProfile() {
	modalWindow.classList.add('active');
	myProfile.classList.add('open')
	setTimeout(function () {
		myProfile.classList.add('fadeIn')
	}, 100)
}
function closeMyProfile () {
	modalWindow.classList.remove('active');
	myProfile.classList.remove('open');
	myProfile.classList.remove('fadeIn')
}



// этап регистрации пользователя

const registerForm = document.forms.register;

const createNewProfileButton = document.getElementById('createProfile')
const formReq = document.querySelectorAll('.form-input')
const errorMessages = document.querySelectorAll('.error_message')


class User {
	constructor (formData) {
		this.firstName = formData.get('firstName');
		this.lastName = formData.get('lastName');
		this.email = formData.get('email');
		this.password = formData.get('password');
		this.number = randomCardNumber();
		this.isLogin = true;
		this.visits = 0;
		this.bonuses = 1240;
		this.books = {};
		this.hasLibraryCard = false;
	}
}

// присваивание рандомного номера
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function randomCardNumber () {
	const result = [];
	for (let i = 1; i < 10; i++) {
		result.push((randomNum(1, 16)).toString(16))
	}
	return result.join('').toUpperCase();
}

// отправка формы
registerForm.addEventListener('submit', formSend)
async function formSend (e) {
	e.preventDefault()
	let error = formValidate(registerForm, 0, 4, formReq);
	if (error === 0) {
		let formData = new FormData(registerForm);
		let user = new User(formData);
		let users = JSON.parse(localStorage.getItem('users')) || [];
		let hasUser = users.some(function(item) {
			return item.email === user.email;
		});
		
		if (!hasUser) {
			closeCard(registerArea);

			user.isLogin = true;
			user.visits += 1;
			let myUsers = JSON.parse(localStorage.getItem('users')) || [];
			myUsers.push(user);
			localStorage.setItem('users', JSON.stringify(myUsers))

			login(user)
		} else {
			wrongUser[0].classList.add('error')
			registerArea.classList.add('error')
		}
		
		
	} else {
		registerArea.classList.add('error')
	}
}

function formValidate(form, start, end) {
	let error = 0;
	// wrongUser[0].classList.add('error')
	loginArea.classList.remove('error')
	registerArea.classList.remove('error')
	for (let i = start; i < end; i++) {
		let input = formReq[i];
		let index = i;
		formRemoveError(input, index)
		if (input.classList.contains('email')) {
			if (emailTest(input)) {
				formAddError(input, index);
				error++
			}
		} else if (input.classList.contains('bankCard')) {
			let bankCard = input.value.split(' ').join('');
			console.log('here')
			console.log(bankCard)
			if (bankCard.length !== 16 || isNaN(Number(bankCard))) {
				formAddError(input, index)
				error++
			}
		} else if (input.classList.contains('password')) { 
			if (input.value.length < 8) {
				formAddError(input, index)
				error++
			}
		} else if (input.classList.contains('code') ) {
			if (isNaN(Number(input.value)) || input.value.length !== 2) {
				formAddError(input, 8)
				error++
			}
		} else if ( input.classList.contains('cvc')) {
			if (isNaN(Number(input.value)) || input.value.length !== 3) {
				formAddError(input, index)
				error++
			}
		}else {
			if (input.value === "") {
				formAddError(input, index)
				error++
			}
		}
	}
	return error;
}


function formAddError(input, index) {
	input.classList.add('error');
	errorMessages[index].classList.add('error')
}

function formRemoveError(input, index) {
	errorMessages[index].classList.remove('error')
	input.classList.remove('error')
	registerArea.classList.remove('error')	
	loginArea.classList.remove('error')
	buyCardForm.classList.remove('error')
	wrongUser.forEach(item => item.classList.remove('error'))
}

function emailTest (input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,8})+$/.test(input.value)
}
// до авторизации 

const buyButtons = document.querySelectorAll('.buy');
const booksList = document.querySelectorAll('.book_cover');
const buyCardArea = document.querySelector('.buy_a_card')
const buyCardForm = document.forms.buyTheCard;

const myOwnBooks = document.querySelector('.my_own_books')

let currentBookIndex 
// на каждую кнопку buy вушаю обработчик, который вызывает функцию buylibraryBook
buyButtons.forEach(function (item, index) {
	
	item.addEventListener('click', function() {
		buyLibraryBook(index)
		currentBookIndex = index;
	})
});

// функция проверяет, залогинен ли пользоатель. Если да, запоминает книгу, которую он хочет купить.
// Затем проверяет, есть ли у пользователя карточка. Если нет, предлагает ее завести. Если есть, добавляет книгу в rented books

function buyLibraryBook (index) {
	let users = JSON.parse(localStorage.getItem('users'));
	if (!users) {
		openCard(registerArea)
	} else {
		let userIndex = users.findIndex(item => item.isLogin === true);
		let user = users[userIndex];
		if (!user) {
			openCard(loginArea)
		} else {
			let bookIndex = index;
			let book = booksList[bookIndex].innerText.split('\n');
			let author = book[1].slice(3, book[1].length);
			book.pop()
			book.push(author)
			let bookCover = book.join(', ')
			closeCard();
			closeMyProfile();
			
			if (user.hasLibraryCard === true) {
				users.splice(userIndex, 1);
				user.books[bookIndex] = bookCover;
				users.push(user);
				localStorage.setItem('users', JSON.stringify(users))
	
				styleButtonOwn(bookIndex)
	
				let li = document.createElement('li');
				li.className = "my_book";
				li.innerHTML = `${user.books[bookIndex]}`
				myOwnBooks.appendChild(li)
	
				let keys = Object.keys(user.books);
				
				if (keys.length > 2) {
					myOwnBooks.classList.add('scroll')
				}
				let myUsers = JSON.parse(localStorage.getItem('users'));
				let myUser = myUsers.find(item => item.isLogin)
				libraryCard(myUser)
				
			} else {
				localStorage.setItem('users', JSON.stringify(users))
				openBuyBookForm()
			}
		}
	}

}

function styleButtonOwn (index) {
	buyButtons[index].classList.add('own');
	buyButtons[index].innerText = 'Own'
	buyButtons[index].setAttribute("disabled", true);
}
function openBuyBookForm () {
	modalWindow.classList.add('active');
	buyCardArea.classList.add('open');
	setTimeout(function() {
		buyCardArea.classList.add('fadeIn')
	}, 100)
}

buyCardForm.addEventListener('submit', checkBuyBookForm)

async function checkBuyBookForm (e) {
	e.preventDefault();
	let error = formValidate(buyCardForm, 6, 13)
	if (error > 1) {
		buyCardArea.classList.add('error')
	} else if (error === 0) {
		closeCard()
		let users = JSON.parse(localStorage.getItem('users'));
		let userIndex = users.findIndex(item => item.number === cardNumber.textContent);
		let user = users[userIndex];
		users.splice(userIndex, 1);
		user.hasLibraryCard = true;
		users.push(user);
		localStorage.setItem('users', JSON.stringify(users))
		buyLibraryBook(currentBookIndex)

	} else {
		buyCardArea.classList.remove('error')
	}
}


// проверить номер карты

const checkTheCardButton = document.querySelector('.check_your_card');
const userInformation = document.querySelector('.info');

const checkCardInputs = document.querySelectorAll('find_card_input');
const libraryForm = document.forms.checkCard;

const  loginForm = document.forms.login;
const myUser = document.querySelector('.user_name')

const cardBeforeRegistration = document.querySelector('.get_card');
const cardAfterRegistration = document.querySelector('.to_profile')

const numberSpace = document.querySelector('.space_for_number')

const yourLibraryCard = document.querySelector('.library_card_find')

libraryForm.addEventListener('submit', function(e) {
	e.preventDefault();
	let users = JSON.parse(localStorage.getItem('users'));
	let number = libraryForm[1].value;
	let name = libraryForm[0].value.split(' ');
	console.log(name)
	if (users) {
		let currentUser = users.find(function(item) {
			return  item.number == number;
			});
		if (currentUser && currentUser.firstName == name[0] && currentUser.lastName == name[1]) {
			libraryCard(currentUser);
			showUserInformationForTenSec()
		}
	} 
})

function showUserInformation() {
	checkTheCardButton.classList.add('close');
	userInformation.classList.add('open');
	setTimeout(function() {
		userInformation.classList.add('fadeIn')
	}, 100)
}

function showUserInformationForTenSec() {
	checkTheCardButton.classList.add('close');
	userInformation.classList.add('open');
	setTimeout(function() {
		userInformation.classList.add('fadeIn')
	}, 100)
	setTimeout(function() {
		console.log('here')
		userInformation.classList.remove('fadeIn')
		checkTheCardButton.classList.remove('close');
		userInformation.classList.remove('open');
		libraryForm.reset()
	}, 10000)
}

function logOut() {
	user = null;
	closeProfile()
	closeMyProfile()
	userInformation.classList.remove('fadeIn')
	checkTheCardButton.classList.remove('close');
	userInformation.classList.remove('open');
	account.classList.remove('checkIn');
	myUser.classList.remove('checkIn');
	cardBeforeRegistration.classList.remove('close');
	cardAfterRegistration.classList.remove('open');
	buyButtons.forEach(function(item) {
		item.classList.remove('own');
		item.innerText = 'Buy'
		item.removeAttribute('disabled')
	})
	myUser.removeAttribute('title')
	myUser.classList.remove('scroll')

	myOwnBooks.replaceChildren();

	let users = JSON.parse(localStorage.getItem('users'));
	if (users) {
		users.forEach(item => item.isLogin = false);
		localStorage.setItem('users', JSON.stringify(users))
	}
	
	numberSpace.classList.remove('login');

	libraryForm[0].value = '';
	libraryForm[1].value = '';
	yourLibraryCard.textContent = 'Find your Library card'
}

const logOutButton = document.querySelector('.log_out_button');
logOutButton.addEventListener('click', function (e) {
	e.stopPropagation()
	closeProfile()
	logOut()
});

// после авторизации

async function checkLoginForm (e) {
	e.preventDefault();

	let error = formValidate(loginForm, 4, 6, formReq);

	if (error === 0) {
		let userLogin = loginForm[0].value;
		let userPassword = loginForm[1].value;

		let users = JSON.parse(localStorage.getItem('users'));
		let currentUserIndex = users.findIndex(function(item) {
			return item.email == userLogin || item.number == userLogin;
		});

		let currentUser = users[currentUserIndex]

		if (currentUser && currentUser.password === userPassword) {
			users.splice(currentUserIndex, 1);
			localStorage.setItem('users', JSON.stringify(users))

			currentUser.isLogin = true;
			currentUser.visits += 1;
			let myUsers = JSON.parse(localStorage.getItem('users')) || [];
			myUsers.push(currentUser);
			localStorage.setItem('users', JSON.stringify(myUsers))

			login(currentUser)
			
		} else {
			wrongUser[1].classList.add('error')
		}
	} else {
		loginArea.classList.add('error')
	}
}

loginForm.addEventListener('submit', checkLoginForm);
const initials = document.querySelector('.initials');
const fullName = document.querySelector('.full_name');
const cardNumber = document.querySelector('.my_number');
const visits = document.querySelectorAll('.visitNumber');
const bonuses = document.querySelectorAll('.bonusNumber');
const books = document.querySelectorAll('.bookNumber')


let user
document.addEventListener("DOMContentLoaded", function() {
	let users = JSON.parse(localStorage.getItem('users'));
	if (users) {
		user = users.find(item => item.isLogin === true)
		if (user) {
			login(user)
		}
		// } else {
		// 	logOut()
		// }
	}
	localStorage.setItem('users', JSON.stringify(users))
})

function login (user) {
	closeCard();


	let userInitials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
	let userFullName = `${user.firstName} ${user.lastName}`;

	account.classList.add('checkIn');
	myUser.classList.add('checkIn');
	myUser.innerHTML = `<p> ${userInitials} </p>`;
	initials.innerHTML = `<span> ${userInitials} </span>`;
	fullName.innerHTML = `<span> ${userFullName} </span>`;
	cardNumber.textContent = user.number;

	libraryForm[0].value = `${user.firstName}  ${user.lastName}`;
	libraryForm[1].value = `${user.number}`;
	yourLibraryCard.textContent = 'Your Library card';

	myUser.setAttribute('title', `${userFullName}`)

	let keys = Object.keys(user.books);
	buyButtons.forEach(function(item, index) {
		if (keys.includes(index.toString())) {
			styleButtonOwn(index)
		}
	} )

	for (let key in user.books) {
		let li = document.createElement('li');
		li.className = "my_book";
		li.innerHTML = `${user.books[key]}`
		myOwnBooks.appendChild(li)
	}

	if (keys.length > 2) {
		myOwnBooks.classList.add('scroll')
	}

	numberSpace.classList.add('login');
	numberSpace.textContent = user.number;

	cardBeforeRegistration.classList.add('close');
	cardAfterRegistration.classList.add('open');

	libraryCard(user);
	showUserInformation()
	
}

myUser.addEventListener('click', function () {
	profileAfter.classList.toggle('open')
	closeMenu()
});

function libraryCard(user) {
	visits.forEach(item => item.textContent = user.visits);
	bonuses.forEach(item => item.textContent = user.bonuses);
	books.forEach(item => item.textContent = Object.keys(user.books).length);
}

registerArea.addEventListener('click', function(e) {e.stopPropagation()})
loginArea.addEventListener('click', function(e) {e.stopPropagation()})
myProfile.addEventListener('click', function(e) {e.stopPropagation()})
buyCardArea.addEventListener('click', function(e) {e.stopPropagation()})


modalWindow.addEventListener('click', function() {
	closeCard(registerArea);
	closeCard(loginArea);
	closeMyProfile();
	resetForm()
	formReq.forEach(function(item, index) {
		formRemoveError(item, index);
	})
})

function resetForm() {
	registerForm.reset()
	loginForm.reset()
	buyCardForm.reset()
}