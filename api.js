//import { fetchAndRenderTasks } from './main.js';

export let token;
export const setToken = (newToken) => {
	token = newToken;
}

//export const textEl = document.getElementById('text-input');

const todosURL = 'https://wedev-api.sky.pro/api/v2/todos';

export const userURL = 'https://wedev-api.sky.pro/api/user/login';

export const userURLWithError = 'https://wedev-api.sky.pro/api/todos/with-error';

export function getTodos() {
	return fetch(todosURL, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})
	.then((response) => {
		
		if(response.status === 401) {
			//token = prompt('Введите верный пароль');
			//fetchAndRenderTasks();
			throw new Error('Нет авторизации');
		}
		
		return response.json();
	})
}

export function deleteTodo({ id }) {
	return fetch(`${todosURL}/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})
	.then((response) => {
		// Запускаем преобразовываем "сырые" данные от api в json
		// Подписываемся на результат преобразования
		return response.json();
	})
}

export function postTodo({ text, date }) {
	return fetch(userURLWithError, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			text: text,
			date: date,
		}),
	}).then((response) => {
		//console.log(response);
		if (response.status === 201) {
			return response.json();
			textEl.blur();
			textEl.value = '';
		}
		else {
			// Код который обработает ошибку
			throw new Error('Сервер упал');
			//return Promise.reject('Сервер упал');
		}
		
		/*
		if (response.status === 500) {
			// Код который обработает ошибку
			//throw new Error('Сервер упал');
			return Promise.reject('Сервер упал');
		}
		else {
			return response.json();
		}
		*/
	})
	
	/*.then((response) => {
		return response;
	})*/
}

export function login({ login, password }) {
	return fetch(userURL, {
		method: 'POST',
		body: JSON.stringify({
			login,
			password
		}),
		
	}).then((response) => {
		//console.log(response);
		if (response.status === 201) {
			return response.json();
		}
		else {
			// Код который обработает ошибку
			alert('Неправильный логин и/или пароль');
			throw new Error('Сервер упал');
			//return Promise.reject('Сервер упал');
		}
		
		/*
		if (response.status === 500) {
			// Код который обработает ошибку
			//throw new Error('Сервер упал');
			return Promise.reject('Сервер упал');
		}
		else {
			return response.json();
		}
		*/
	})
	
	/*.then((response) => {
		return response;
	})*/
}