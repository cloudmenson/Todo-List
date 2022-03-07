const taskInput = document.getElementById('todo-list__input');
const addTaskBtn = document.querySelector('.todo-list__add-btn');
const taskListWrap = document.querySelector('.todo-list__list-wrapper');

let tasks;
!localStorage.tasks
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem('tasks')));

let todoItemElems = [];

function Task(description) {
  this.description = description;
  this.completed = false;
}

const createTemplate = (task, index) => {
  return `
  <div class='todo-list__item ${task.completed ? 'checked' : ''}'>
    <div class='todo-list__item-description'>${task.description}</div>
    <div class='todo-list__item-btns'>
      <label class='todo-list__item-label'>
        <input onclick='completedTask(${index})' class='todo-list__btn-complete' type='checkbox' ${task.completed ? 'checked' : ''}>
        <span></span>
      </label>
      <button onclick='deleteTask(${index})' class='todo-list__btn-delete btn-floating btn-small waves-effect waves-light red'>
        <i class='material-icons'>close</i>
      </button>
    </div>
  </div>`;
};

const filterTasks = () => {
  const activeTasks =
    tasks.length && tasks.filter((item) => item.completed === false);
  const comoletedTasks =
    tasks.length && tasks.filter((item) => item.completed === true);
  tasks = [...activeTasks, ...comoletedTasks];
};

const addHtmlTasksList = () => {
  taskListWrap.innerHTML = '';
  if (tasks.length > 0) {
    filterTasks();
    tasks.forEach((item, index) => {
      taskListWrap.innerHTML += createTemplate(item, index);
    });
    todoItemElems = document.querySelectorAll('.todo-list__item');
  }
};
addHtmlTasksList();

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const completedTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todoItemElems[index].classList.add('checked');
  } else {
    todoItemElems[index].classList.remove('checked');
  }
  updateLocal();
  addHtmlTasksList();
};

const deleteTask = (index) => {
  todoItemElems[index].classList.add('deletion');
  setTimeout(() => {
    if (tasks.splice(index, 1) && confirm('Delete task?')) {
      updateLocal();
      addHtmlTasksList();
    }
  }, 200);
};

addTaskBtn.addEventListener('click', () => {
  tasks.push(new Task(taskInput.value));
  updateLocal();
  addHtmlTasksList();
  taskInput.value = '';
});