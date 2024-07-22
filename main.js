import { renderTasks } from './renderTasks.js';
import { renderLogin } from './renderLogin.js';
import { getTodos } from './api.js';

// Что такое JSON
const obj = {
	name: 'asd',
	list: [{id: 1}, {id: 2}],
}

const jsonObj = JSON.stringify(obj);

//console.log(jsonObj);

const objFromJson = JSON.parse(jsonObj);
console.log(objFromJson);

//Находит все элементы с классом student в разметке
const tasksElements = document.querySelectorAll('.tasks');


//TODO: Получать из хранилища данных
export let tasks = [];
	//{
		//text: 'Купить чай'
	//},
	//{
		//text: 'Заварить чай'
	//},
	//{
		//text: 'Выпить чай'
	//},
//];

export const upgradeTasks = newTasks => {
  tasks = newTasks;
}


export const fetchAndRenderTasks = () => {
	// Запросы в API асинхронны, мы не знаем как долго будет выполняться запрос
	// Запрос может выполняться секунды и даже минуты
	// fetch запускает запрос в api
	
	getTodos()
	
		// Подписываемся на результат преобразования
		.then((responseData) => {
			// Получили данные и рендерим их в приложении
			tasks = responseData.todos;
			renderTasks({ fetchAndRenderTasks });
		});
};

console.log('-------------------');

//buttonElement.addEventListener('click', () => {

//});

console.log('-------------------');


// Здесь создавалась функция initDeleteButtonsListeners


// Здесь создавалась функция RenderTasks


//fetchAndRenderTasks({ tasks });
renderLogin({ fetchAndRenderTasks });
//renderTasks({ tasks, fetchAndRenderTasks });

// <img src="." onerror="alert('Ха-ха, ваши данные украдены!')" />



/*

// Запросы в API асинхронны, мы не знаем как долго будет выполняться запрос
// Запрос может выполняться секунды и даже минуты
// fetch запускает запрос в api
const fetchProm = fetch('https://webdev-hw-api.vercel.app/api/tasks/string', {
	method: 'GET',
});

// Подписываемся на успешное завершение запроса с помощью then
fetchProm.then((resp) => {
	// Запускаем преобразовываем "сырые" данные от api в json
	const jsonProm = resp.json();
	
	// Подписываемся на результат преобразования
	jsonProm.then((respData) => {
		console.log(respData);
		
		// Получили данные и рендерим их в приложении
		console.log(respData.string);
	});
});

*/

//Удаление элементов списка:
//1. Добавить кнопку "Удалить"
//2. Добавить на кнопки удаления обработчик клика
//3. Реализовать внутри обработчика удаление элементов