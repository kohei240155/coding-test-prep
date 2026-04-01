const todoInput = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-btn');
const todoList = document.querySelector('#todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');

let todos = [];
let currentFilter = 'all';

function addTodo() {
  const text = todoInput.value.trim();

  if (!text) return;

  const todo = {
    id: Date.now(),
    text: text,
    completed: false,
  }

  todos.push(todo);

  todoInput.value = '';

  render();

  saveTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  render();
  saveTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );

  render();
  saveTodos();
}

function render() {
  const filtered = todos.filter((todo) => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true;
  });

  todoList.innerHTML = '';

  filtered.forEach((todo) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'x';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
}

addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;

    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    render();
  });
});

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const saved = localStorage.getItem('todos');
  if (saved) {
    todos = JSON.parse(saved);
  }
}

loadTodos();
render();