const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const inputEl = $('.todo-input');
const formEl = $('.todo-form');
const todoList = $('.todo-list');
let countId = 0;
const app = {
  todos: [],
  isEdit: false,
  addTodo() {
    const value = inputEl.value;
    if (value) {
      countId++;
      const data = {
        id: countId,
        value: value,
      };
      this.todos.push(data);
      inputEl.value = '';
      this.render();
    }
  },
  editTodo(id, data) {
    // show input and btn edit
    if (data) {
      const index = this.todos.findIndex((x) => x.id === id);
      this.todos[index].value = data;
      inputEl.value = '';
      app.isEdit = false;
      this.render();
    }
  },
  removeTodo(id) {
    this.todos = this.todos.filter((x) => x.id !== id);
    this.render();
  },
  handleEvents: function () {
    const _this = this;
    formEl.onsubmit = function (e) {
      e.preventDefault();
      debugger;
      _this.addTodo();
    };
  },
  handleTodoItemsEvent() {
    const _this = this;
    const todoItems = $$('.todo-item');
    todoItems.forEach((item) => {
      debugger;
      const detailBtn = item.querySelector('.detail-btn');
      const removeBtn = item.querySelector('.remove-btn');
      const todoText = item.querySelector('.todo-text');
      const editInput = item.querySelector('.edit-input');
      const editBtn = item.querySelector('.edit-btn');
      const id = Number(item.dataset.id);
      detailBtn.onclick = function () {
        _this.isEdit = true;
        editInput.value = todoText.innerText;
        item.classList.toggle('active', this.isEdit);
      };

      removeBtn.onclick = function () {
        _this.removeTodo(id);
      };

      editBtn.onclick = function () {
        _this.editTodo(id, editInput.value);
      };
    });
  },
  render() {
    debugger;
    const data = this.todos
      .map(
        (todo) =>
          `
          <li class="todo-item" data-id="${todo.id}">
            <div class="form-detail">
              <span class="todo-text">${todo.value}</span>

              <div class="btn-action-group">
                <button type="button" class="detail-btn" data-id="${todo.id}">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button type="button" class="remove-btn" data-id="${todo.id}">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <div class="form-edit">
              <input type="text" class="input edit-input" data-id="${todo.id}" placeholder="Update task" />
              <button type="button" class="btn edit-btn" data-id="${todo.id}">Add Task</button>
            </div>
          </li>
          `
      )
      .join('');
    // handle event for todo item
    todoList.innerHTML = data;
    this.handleTodoItemsEvent();
  },
  start() {
    this.render();
    this.handleEvents();
  },
};
app.start();
