import { login } from './api.js';
import { token } from './api.js';
import { setToken } from './api.js';
import { userNameFromAPI } from './renderTasks.js';
import { writeUserName } from './renderTasks.js';

export const renderLogin = ({ fetchAndRenderTasks }) => {
	const appElement = document.getElementById('app');
	const loginHtml = `
	<h1 id="title">Страница входа</h1>
	<div class="form">
		<h3 class="form-title">Форма входа</h3>
		<div class="form-row">
			<label for="login-input">Логин: </label>
			<input class="input" id="login-input" type="text" placeholder="Введите логин" />
		</div>
		<br />
		<div class="form-row">
			<label for="password-input">Пароль: </label>
			<input class="input" id="password-input" type="text" placeholder="Введите пароль" />
		</div>
		<br />
		<button class="button" id="login-button">Войти</button>
		<span>&nbsp;</span>
	</div>
	`
	
	appElement.innerHTML = loginHtml;
	
	const loginButtonElement = document.getElementById('login-button');
	const loginInputElement = document.getElementById('login-input');
	const passwordInputElement = document.getElementById('password-input');

	//console.log(loginButtonElement);

	loginButtonElement.addEventListener('click', (response) => {
		console.log(loginInputElement.value, passwordInputElement.value);
		login({
			login: loginInputElement.value,
			password: passwordInputElement.value,
		})
		.then((responseData) => {
			console.log(token);
			setToken(responseData.user.token);
			console.log(token);
			return writeUserName(responseData.user.name);
			
		})
		.then(() => {
			fetchAndRenderTasks();
		})
	});
};