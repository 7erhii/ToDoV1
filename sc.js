const wrapper = document.querySelector('.js-themeChange');
const inputBtn = document.querySelector('#js-input-btn');
const tasksList = document.querySelector('.js-tasks__list');
const colorBtn = document.querySelector('.js-color__change');
const body = document.querySelector('body');
// const content = document.querySelector('.content');
const pinButton = document.getElementById('js-input-btn');
const tasksForm = document.querySelector('.js-inpute-form');

let taskToEditId = null;
const selectedTasksArr = []; // сохраняем выбранные селектед таск
const closeErrorMessage = document.getElementById('js-error'),
	closeErrorWindow = document.querySelector('.js-error-form');
//окно ошибки
const createTask = document.getElementById('js-addTask');
//создание жлемента на странице
const infoBlock = document.querySelector('.js-info');
const clearAllTasksBtn = document.querySelector('.js-clear__btn');
const clearOnlyCheckedBtn = document.querySelector('.js-clearChecked');

let tasksArr = [];
//массив задач
const taskMock = { id: 'asdas', value: '', status: 'inprogress', time: 3600 };

function errorController(message) {
	console.log('message');
	// display block на элемент нотифакации
	// в див сообщение message
}
const editeTaskParrent = document.querySelector('.js-tasks__list');
//редактирование задач
const editTask = document.querySelector('.js-active-edite-btn');
// //редактрирование задачи
const showPopup = document.querySelector('.js-popup');
//popup показать
const closePopup = document.querySelector('.js-popup__close');
//закрыть popup
const acceptPopup = document.querySelector('.js-popup__accept');
//принять изменения
const takeCorrTask = document.querySelector('.js-popup__input');
takeCorrTask.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		acceptNew(e);
	}
});
//взять текст из popup
const tasksCount = document.querySelector('.js-descr__count');
//количество отображенных задач

//количество выполненных задач

const addClearCheckedBtn = document.querySelector('.js-clear__checked');
//кнопка удаления выбранных элементов

const timerApear = document.querySelector('.js-task__counter-timer');

//______________CLICK
pinButton.addEventListener('click', addNewTask); //клик >add >проверяем поле воода
tasksForm.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		addNewTask(e);
	}
}); // при нажатии на Enter
createTask.addEventListener('click', deliteOneTask); //клик >add>delite 1 task
closeErrorMessage.addEventListener('click', closeError); // закрытие окна ошибки
clearAllTasksBtn.addEventListener('click', clearAllTasks); //кнопка закрыть все
editeTaskParrent.addEventListener('click', openPopup);
editeTaskParrent.addEventListener('click', changeStatus);

editeTaskParrent.addEventListener('click', timeCounter);

//_____________CLICKS END______

function uuidv4() {
	return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

//добавление новой задачи
function addNewTask(e) {
	e.preventDefault();

	if (tasksForm.value === '') {
		closeErrorWindow.classList.add('js-visibility-appear');
	} else {
		const taskId = uuidv4();
		const inputText = tasksForm.value;
		const taskObj = {
			id: taskId,
			value: inputText,
		};
		tasksArr.push(taskObj);
		tasksForm.value = '';
		infoBlock.classList.add('js-visibility-hide');

		const taskHtml = `
			<div class="tasks__active task__style js-tasks__active" data-blockId="${taskId}" id="active">

				<div class="task__counter">start</div>
				<div class="task__counter-timer js-task__counter-timer">00:00t</div>
				<div class="task__stop paused">stop</div>

				<div class="tasks__active-text">
					${inputText}
				</div>
				<div class="tasks__active-check">
					<button
						class="tasks__active-edite-btn js-active-edite-btn js-editeBtn"
						data-iddd="${taskId}"
						id="editeBtn"
					>
						Edit
					</button>
					<input class="tasks__active-check-check js-tasks__active-check" type="checkbox"  /><span>done</span>
					<button class="tasks__active-check-btn" data-iddd="${taskId}">
						Delete
					</button>
				</div>
			</div>
		`;

		createTask.insertAdjacentHTML('beforeend', taskHtml);

		clearAllTasksBtn.classList.remove('js-visibility-hide');
		clearAllTasksBtn.classList.add('js-visibility-appear');

		countOfTasks();
		const formColor = document.querySelector('.js-tasks__active');
		const wrapper = document.querySelector('.wrapper');

		if (wrapper.classList.contains('js-color__content')) {
			const taskCard = document.querySelector(`[data-blockId="${taskId}"]`);
			taskCard.classList.add('task__style-dark');
		}
	}
}
//============CHECK KOLOR
function changeTaskColor() {
	const taskColor = document.querySelectorAll();
}
function closeError(e) {
	e.preventDefault;
	closeErrorWindow.classList.remove('js-visibility-appear');
}
function clearAllTasks(e) {
	e.preventDefault();
	tasksArr = [];
	createTask.innerHTML = '';
	clearAllTasksBtn.classList.remove('js-visibility-appear');

	clearAllTasksBtn.classList.add('js-visibility-hide');

	infoBlock.classList.remove('js-visibility-hide');

	infoBlock.classList.add('js-visibility-appear');

	addClearCheckedBtn.classList.remove('js-visibility-appear');

	addClearCheckedBtn.classList.add('js-visibility-hide');

	clearOnlyCheckedBtn.classList.remove('js-visibility-appear');
	addClearCheckedBtn.classList.add('js-visibility-hide');

	countOfTasks();
}
// +=================================================stsrt
closePopup.addEventListener('click', function (e) {
	e.preventDefault();

	showPopup.style.display = 'none';
});

//___________________________________________________

function pushCorrText() {
	return takeCorrTask.value;
}
//Добавлениее количества задач (числом)
function countOfTasks() {
	if (tasksArr.length === 0) {
		tasksCount.innerHTML = 'Today: No tasks &#128564;';
	} else {
		tasksCount.innerHTML = `Today: ${tasksArr.length}`;
	}
}
countOfTasks();

function findTaskObject(idToFind) {
	return tasksArr.find((item) => item.id === idToFind);
}

function changeStatus(e) {
	const checkboxes = document.querySelectorAll('input[type="checkbox"]');
	let isChecked = false;
	const checkbox = e.target.closest('.js-tasks__active-check');
	const parent = checkbox.closest('.js-tasks__active');
	const selectedTask = findTaskObject(parent.dataset.blockid);

	if (checkbox) {
		if (!wrapper.classList.contains('js-color__content')) {
			if (checkbox.checked) {
				parent.classList.remove('task__style');
				parent.classList.add('task__style-checked');

				console.log(selectedTask, 'selectedTask');
				checkbox.setAttribute('checked', 'checked');
			} else {
				parent.classList.remove('task__style-checked');
				parent.classList.add('task__style');

				console.log(selectedTask, 'unSelectedTask');
				checkbox.removeAttribute('checked');
			}

			for (let i = 0; i < checkboxes.length; i++) {
				if (checkboxes[i].checked) {
					isChecked = true;
					break;
				}
			}
			if (isChecked) {
				addClearCheckedBtn.classList.remove('js-visibility-hide');
				addClearCheckedBtn.classList.add('js-visibility-appear');
			} else {
				addClearCheckedBtn.classList.remove('js-visibility-appear');
				addClearCheckedBtn.classList.add('js-visibility-hide');
			}
		} else if (wrapper.classList.contains('js-color__content')) {
			parent.style.background = '#3d3b3b';
			if (checkbox.checked) {
				parent.style.color = '#fff';
				parent.classList.remove('task__style');
				parent.classList.remove('task__style-dark');
				parent.classList.add('task__style-dark-checked');
				console.log(selectedTask, 'selectedTask');
				checkbox.setAttribute('checked', 'checked');
			} else {
				parent.style.color = '#fff';
				parent.style.background = '#3d3b3b';
				parent.classList.remove('task__style');
				parent.classList.remove('task__style-dark-checked');
				parent.classList.add('task__style-dark');
				console.log(selectedTask, 'unSelectedTask');
				checkbox.setAttribute('checked', 'disabled');
			}
			for (let i = 0; i < checkboxes.length; i++) {
				if (checkboxes[i].checked) {
					isChecked = true;
					break;
				}
			}
			if (isChecked) {
				addClearCheckedBtn.classList.remove('js-visibility-hide');
				addClearCheckedBtn.classList.add('js-visibility-appear');
			} else {
				addClearCheckedBtn.classList.remove('js-visibility-appear');
				addClearCheckedBtn.classList.add('js-visibility-hide');
			}
		}
		{
		}
	}
}
//===========================================================

function openPopup(e) {
	if (e.target.classList.contains('js-editeBtn')) {
		e.preventDefault();
		taskToEditId = e.target.dataset.iddd;
		showPopup.style.display = 'flex';
		const inputPopup = document.querySelector('.js-popup__input');
		const editValue = findTaskObject(taskToEditId);
		inputPopup.value = editValue.value;

		inputPopup.focus();
	}
}

acceptPopup.addEventListener('click', acceptNew);

function acceptNew(e) {
	e.preventDefault();
	const inputPopup = document.querySelector('.js-popup__input');
	const updateTaskArray = tasksArr.map((item) => {
		if (item.id === taskToEditId) {
			return {
				id: taskToEditId,
				value: inputPopup.value,
			};
		}
		{
			return item;
		}
	});
	tasksArr = updateTaskArray;

	const taskTextElement = document.querySelector(
		`[data-blockId="${taskToEditId}"] .tasks__active-text`
	);
	taskTextElement.innerHTML = inputPopup.value;
	showPopup.style.display = 'none';
	timeCounter(e);
}
function deliteOneTask(e) {
	const deleteBtn = e.target.closest('.tasks__active-check-btn');
	if (deleteBtn) {
		e.preventDefault();
		const taskId = deleteBtn.dataset.iddd;
		tasksArr = tasksArr.filter((task) => task.id !== taskId);
		const blockToDelete = document.querySelector(`[data-blockId="${taskId}"]`);
		if (blockToDelete) {
			blockToDelete.remove();
			countOfTasks(); // удаляем задачу со страницы
		}
	}
}

clearOnlyCheckedBtn.addEventListener('click', clearCheckedTasks);

function clearCheckedTasks() {
	const checkedItems = document.querySelectorAll(
		'.js-tasks__active-check:checked'
	);

	checkedItems.forEach((item) => {
		const taskItem = item.closest('.js-tasks__active');
		const taskId = taskItem.dataset.blockid;
		taskItem.remove();
		tasksArr = tasksArr.filter((task) => task.id !== taskId);
	});

	countOfTasks();

	const activeTask = document.querySelector('.js-tasks__active');

	if (!activeTask) {
		clearAllTasksBtn.classList.remove('js-visibility-block');

		clearAllTasksBtn.classList.add('js-visibility-hide');

		infoBlock.style.display = 'flex';

		addClearCheckedBtn.classList.add('js-visibility-hide');
		addClearCheckedBtn.classList.remove('js-visibility-appear');
	}

	const checkedItemsLength = document.querySelectorAll(
		'.tasks__active-check input[type="checkbox"]:checked'
	);
	if (checkedItemsLength.length > 0) {
		addClearCheckedBtn.classList.remove('js-visibility-hide');
		addClearCheckedBtn.classList.add('js-visibility-appear');
	} else {
		addClearCheckedBtn.classList.remove('js-visibility-appear');
		addClearCheckedBtn.classList.add('js-visibility-hide');
	}
}

// ==================SET TIMER==========================================

editeTaskParrent.addEventListener('click', timeCounter);

function timeCounter(e) {
	const clickedElement = e.target;
	const timerApear = clickedElement
		.closest('.js-tasks__active')
		.querySelector('.js-task__counter-timer');
	const stopButton = clickedElement
		.closest('.js-tasks__active')
		.querySelector('.task__stop');

	if (clickedElement.classList.contains('task__counter')) {
		timerApear.style.display = 'flex';
		stopButton.style.zIndex = '1';
		stopButton.style.display = 'flex';

		let startTime = new Date().getTime();
		let timeElapsed = 0;
		let timerInterval = setInterval(() => {
			timeElapsed = new Date().getTime() - startTime;
			let minutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));
			let seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);
			let formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${
				seconds < 10 ? '0' : ''
			}${seconds}`;
			timerApear.textContent = formattedTime;
		}, 1000);

		stopButton.addEventListener('click', () => {
			clearInterval(timerInterval);
			stopButton.style.zIndex = '0';
			stopTimer(clickedElement);
			stopButton.style.display = 'none';
		});
	}
}

colorBtn.addEventListener('click', () => {
	const parrentCards = document.querySelector('.js-tasks__list');
	const cardsInside = parrentCards.querySelector('.js-tasks__active');
	body.classList.toggle('js-color__content');
	wrapper.classList.toggle('js-color__content');
	const checkbox = document.querySelector('.js-tasks__active-check');

	const descrLineColor = document.querySelector('.descr__line');
	const infoLineColor = document.querySelector('.info');

	if (wrapper.classList.contains('js-color__content')) {
		descrLineColor.classList.toggle('js-descr-color');
		infoLineColor.classList.toggle('js-descr-color');
	} else {
		descrLineColor.classList.toggle('js-descr-color');
		infoLineColor.classList.toggle('js-descr-color');
	}

	if (wrapper.classList.contains('js-color__content')) {
		const lists = document.querySelectorAll('.js-tasks__list');

		lists.forEach((list) => {
			const activeItems = list.querySelectorAll('.js-tasks__active');
			activeItems.forEach((item) => {
				const checkbox = item.querySelector('.js-tasks__active-check');
				if (checkbox && checkbox.checked) {
					item.classList.remove('task__style-checked');
					item.classList.add('task__style-dark-checked');
				} else {
					item.classList.remove('task__style-dark');
					item.classList.add('task__style-dark');
				}
			});
		});
	} else {
		const lists = document.querySelectorAll('.js-tasks__list');

		lists.forEach((list) => {
			const activeItems = list.querySelectorAll('.js-tasks__active');
			activeItems.forEach((item) => {
				const checkbox = item.querySelector('.js-tasks__active-check');
				if (checkbox && checkbox.checked) {
					item.classList.remove('task__style-dark-checked');
					item.classList.add('task__style-checked');
				} else {
					item.classList.remove('task__style-dark');
					item.classList.add('task__style');
				}
			});
		});
	}
});
