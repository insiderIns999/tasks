import { deleteTodo } from './api.js';
import { tasks } from './main.js';
import { upgradeTasks } from './main.js';
import { getTodos } from './api.js';
import { postTodo } from './api.js';

const listElement = document.getElementById('list');

export let userNameFromAPI;
export const writeUserName = (userName) => {
	userNameFromAPI = userName;
}

/*
const initDeleteButtonsListeners = (fetchAndRenderTasks) => {
	
	
};

*/

export const renderTasks = ({ fetchAndRenderTasks }) => {
	const appElement = document.getElementById('app');
	
	const formatDate = (date) => {
	  return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}/${date.getFullYear()} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
	}
	
	const tasksHtml = tasks.map((task) => {
		return `<li class="task">
			<p class="task-text">
				${task.text} (Создал: ${task.user?.name ?? "Неизвестно"})
			</p>
			<p><i>Задача создана: ${formatDate(new Date(task.created_at))}</i></p>
			<button data-id="${task.id}" class="delete-button">Удалить</button>
		</li>`
	}).join('');
	
	const appHtml = `
	<h2 id="auth-user">${userNameFromAPI}</h2>
	<h1 id="title">Список задач</h1>
	<ul class="tasks" id="list">${tasksHtml}</ul>
	<div class="form">
		<h3 class="form-title">Форма добавления</h3>
		<div class="form-row">
			<label for="text-input">Что нужно сделать: </label>
			<input class="input" id="text-input" type="text" placeholder="Выпить кофе" />
		</div>
		<br />
		<button class="button" id="add-button">Добавить</button>
		<br /><br />
		<input class="input" id="sername-input" type="text" placeholder="Введите фамилию" />
		<br /><br />
		<button class="button" id="save-sername-button">Сохранить фамилию</button>
	</div>
	`;
	
	appElement.innerHTML = appHtml;
	
	const titleToTimer = () => {
		const titleElement = document.getElementById('title');
		titleElement.addEventListener('click', () => {
			let count = 3;
			const intervalID = setInterval(() => {
				if(count == 1) {
					titleElement.textContent = 'Список задач';
					clearInterval(intervalID);
				}
				else {
					titleElement.textContent = `${--count}`;
				}
			}, 1000);
		});
	}
	
	titleToTimer();
	
	const deleteButtonsElements = document.querySelectorAll('.delete-button');
	
	for(const deleteButtonElement of deleteButtonsElements) {
		deleteButtonElement.addEventListener('click', (event) => {
			event.stopPropagation();
			//План удаления:
			//1. (+) Мы храним список студентов в js массиве
			//2. (+) При клике мы удаляем нужный элемент из массива
			//3. (+) На основе нового массива в js формируем html разметку списка
			deleteButtonElement.innerHTML = 'Задача удаляется...';
			setTimeout(() => {
				
				const id = deleteButtonElement.dataset.id;
				
				// Подписываемся на успешное завершение запроса с помощью then
				
				deleteTodo({ id })
				
				.then((/*responseData*/) => {
					//console.log(responseData);
					// Получили данные и рендерим их в приложении
					
					/*
					tasks = responseData.todos;
					renderTasks();
					return;
					*/
					
					fetchAndRenderTasks();
					return;
				});
				
				fetchAndRenderTasks();
				
			}, 1000);
		});
	};
	
	const buttonElement = document.getElementById('add-button');
	const textEl = document.getElementById('text-input');
	const buttonDelete = document.getElementById('delete');
	const saveSernameButton = document.getElementById('save-sername-button');
	
	buttonElement.addEventListener('click', () => {
		textEl.classList.remove('error');
		//nameEl.style.borderWidth = '1px';
		//nameEl.style.borderStyle = 'solid';
		//nameEl.style.borderColor = '#777';
		//nameEl.style.borderRadius = '0';
		if(textEl.value === '') {
			textEl.classList.add('error');
			return;
		}
		else {
			//TODO: Добавлять задачу в хранилище данных
			//tasks.push({
				//text: textEl.value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
			//});
		
			//const oldListHtml = listElement.innerHTML;
			//buttonDelete.innerHTML = 'Удалить' + ` <span style="color: ${colorElement.value}">${colorElement.value}</span>`;
			//listElement.innerHTML = oldListHtml +
			//`<li class="student" data-color="${colorElement.value}">
			//	<p class="student-name">
			//		${nameEl.value}, любимый цвет
			//		<span style="color: ${colorElement.value}">${colorElement.value}</span>
			//	</p>
			//	<button class="delete-button">Удалить</button>
			//</li>`;-->
			
			// Запросы в API асинхронны, мы не знаем как долго будет выполняться запрос
			// Запрос может выполняться секунды и даже минуты
			// fetch запускает запрос в api
			// Подписываемся на успешное завершение запроса с помощью then
			/*fetch('https://wedev-api.sky.pro/api/todos', {
				method: 'POST',
				body: JSON.stringify({
					text: textEl.value,
				}),
			}).then((response) => {
				// Запускаем преобразовываем "сырые" данные от api в json
				// Подписываемся на результат преобразования
				response.json().then((responseData) => {
					console.log(responseData);
							
					// Получили данные и рендерим их в приложении
					
					// { result: 'OK' }
					
					fetch('https://wedev-api.sky.pro/api/todos', {
						method: 'GET',
					}).then((response) => {
						response.json().then((responseData) => {
							tasks = responseData.todos;
							renderTasks();
						});
					});
					
					//tasks = responseData.todos;
					//renderTasks();
				});
			});
			*/
			
			//const startAt = Date.now();
			//console.log('Начинаем делать запрос');
			
			buttonElement.disabled = true;
			buttonElement.style.cursor = 'not-allowed';
			buttonElement.style.backgroundColor = '#f00';
			buttonElement.textContent = 'Элемент добавляется...';
			
			// Пример, код выше переписанный на цепочко промисов:
			
			//const promise1 = 
			
			postTodo({ 
				text: textEl.value,
				date: formatDate(new Date),
				buttonElement,
			})
			.then((response) => {
				buttonElement.disabled = true;
				buttonElement.textContent = 'Загружаю список...';
				return response;
			})
			
			getTodos()
			//promise1
			.then((response) => {
				return fetchAndRenderTasks();
			})
			/*.then((responseData) => {
				return fetch('https://wedev-api.sky.pro/api/todos', {
					method: 'GET',
				});
			})
			.then((response) => {
				console.log('Время ' + (Date.now() - startAt));
				return response;
			})
			.then((response) => {
				return response.json();
			})
			.then((response) => {
				console.log('Время ' + (Date.now() - startAt));
				return response;
			})
			.then((responseData) => {
				tasks = responseData.todos;
				renderTasks();
				return 'Что за ...';
			})
			*/
			.then((response) => {
				buttonElement.style.backgroundColor = '#ff0';
				buttonElement.style.cursor = 'auto';
				buttonElement.addEventListener('mouseover', () => {
					buttonElement.style.backgroundColor = '#00f';
				});
				buttonElement.addEventListener('mouseout', () => {
					buttonElement.style.backgroundColor = '#ff0';
				});
				buttonElement.disabled = false;
				buttonElement.textContent = 'Добавить';
				
				return response;
				
				
				//throw new Error('Some error');
				
				//const obj = {};
				
				//console.log(obj.a.b);
			})
			
			.catch((error) => {
				buttonElement.disabled = false;
				buttonElement.textContent = 'Добавить';
				buttonElement.style.cursor = 'auto';
				buttonElement.style.backgroundColor = '#ff0';
				buttonElement.addEventListener('mouseover', () => {
					buttonElement.style.backgroundColor = '#00f';
				});
				buttonElement.addEventListener('mouseout', () => {
					buttonElement.style.backgroundColor = '#ff0';
				});
				//alert('Кажется что-то пошло нге так, попробуй позже');
				// TODO: Отправлять в систему сбора ошибок
				console.warn(error);
				return 'go';
			});//.then((data) => {
				//console.log(data);
			//});
			
			renderTasks({ tasks, fetchAndRenderTasks });
		}
	});
	
	function goByClick() {
		let sernameEl = document.getElementById('sername-input');
		fetch('https://webdev-hw-api.vercel.app/api/tasks/string', {
			method: 'POST',
			body: JSON.stringify({
				string: sernameEl.value,
			})
		}).then((resp) => {
			resp.json().then((respData) => {
				console.log(respData.string);
			});
		});
		sernameEl.value = '';
	}

	saveSernameButton.addEventListener('click', goByClick);
};