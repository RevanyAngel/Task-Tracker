let tasks = [];
const form = document.getElementById('taskForm');
const input = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function renderTasks() {
  taskList.innerHTML = '';

  const pending = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);
  const ordered = pending.concat(completed);

  for (const task of ordered) {
    const li = document.createElement('li');
    li.dataset.id = task.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'chk';
    checkbox.checked = task.completed; 

    const span = document.createElement('span');
    span.textContent = task.description;
    if (task.completed) span.classList.add('completed');

    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑️';
    delBtn.className = 'delete';

    li.append(checkbox, span, delBtn);
    taskList.appendChild(li);
  }
}


form.addEventListener('submit', e => {
  e.preventDefault();
  const desc = input.value.trim();
  if (!desc) return;
  tasks.push({ id: Date.now(), description: desc, completed: false, createdAt: Date.now() });
  saveTasks();
  input.value = '';
  renderTasks();
});

taskList.addEventListener('change', (e) => {
  if (!e.target.matches('.chk')) return;

  const li = e.target.closest('li');
  const id = Number(li.dataset.id);

  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: e.target.checked } : t
  );

  renderTasks();
});

taskList.addEventListener('click', (e) => {
  if (!e.target.matches('.delete')) return;

  const li = e.target.closest('li');
  const id = Number(li.dataset.id);

  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
});


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem("tasks");
  tasks = stored ? JSON.parse(stored) : [];
}

loadTasks();
renderTasks();

