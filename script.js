const divTask = document.getElementById('task');
const addTaskButton = document.getElementById('add-button');
const addTaskInput = document.getElementById('add-input');

const allButton = document.getElementById('all')
const activeButton = document.getElementById('active')
const completedButton = document.getElementById('completed')

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  tasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}

function addTask(event) {
  event.preventDefault();

  const taskText = addTaskInput.value;
  if (!taskText) return; 

  const newTask = {
    text: taskText,
    completed: false
  };

  createTaskElement(newTask.text, newTask.completed);

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  addTaskInput.value = '';
}

function createTaskElement(taskText, isCompleted) {
  const taskItemDiv = document.createElement('div');
  taskItemDiv.classList.add('task-item');

  const pElement = document.createElement('p');
  pElement.textContent = taskText;

  if (isCompleted) {
    pElement.style.textDecoration = 'line-through';
    pElement.style.color = 'lightgray';
  }

  const inputElement = document.createElement('input');
  inputElement.type = 'checkbox';
  inputElement.checked = isCompleted;

	const deleteTask = document.createElement('button')
	deleteTask.textContent = 'Deletar Tarefa'
	deleteTask.classList.add('delete-button')


  inputElement.addEventListener('change', function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.text === taskText);

    tasks[taskIndex].completed = inputElement.checked;

    localStorage.setItem('tasks', JSON.stringify(tasks));

    if (inputElement.checked) {
      pElement.style.textDecoration = 'line-through';
      pElement.style.color = 'lightgray';
    } else {
      pElement.style.textDecoration = 'none';
      pElement.style.color = '';
    }
  });

	deleteTask.addEventListener('click',function() {
		const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.text === taskText);

		if (taskIndex !== -1) {
			tasks.splice(taskIndex, 1);
			localStorage.setItem('tasks', JSON.stringify(tasks));
			taskItemDiv.remove();
		}
	})

  taskItemDiv.appendChild(pElement);
	taskItemDiv.appendChild(inputElement);
	taskItemDiv.appendChild(deleteTask);

  divTask.appendChild(taskItemDiv);

}

function showAllTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  divTask.innerHTML = ''; 

  tasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}

function showActiveTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  divTask.innerHTML = ''; 

  tasks.filter(task => !task.completed).forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}

function showCompletedTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  divTask.innerHTML = ''; 

  tasks.filter(task => task.completed).forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}

loadTasks();

addTaskButton.onclick = addTask;
allButton.onclick = showAllTasks;
activeButton.onclick = showActiveTasks;
completedButton.onclick = showCompletedTasks;