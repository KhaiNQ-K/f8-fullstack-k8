import todoApi from '../api/todoApi.js';
import { Component, createElement } from '../core.js';
import CompletedButton from './CompletedButton.js';
import TodoFilter from './TodoFilter.js';
import TodoForm from './TodoForm.js';
import TodoList from './TodoList.js';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      searchQuery: '',
      isModalOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }
  componentDidMount() {
    this.fetchTodos();
    document.body.appendChild(this.modal.render());
  }
  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  async fetchTodos() {
    try {
      const todoList = await todoApi.getAll();
      this.setState({ todoList });
    } catch (e) {
      console.log('Fail to fetch todos', e);
    }
  }
  async addTodo(newTodoText) {
    try {
      const data = {
        newTodoText,
        completed: false,
      };
      const newTodo = await todoApi.add(data);
      this.setState({ todos: [...this.state.todos, newTodo] });
    } catch (e) {
      console.log('Fail to add todo', e);
    }
  }
  async editTodo(id, newTodoText) {
    try {
      const data = {
        newTodoText,
      };
      await todoApi.update(id, data);
      this.setState({
        todos: this.state.todos.map((todo) => (todo.id === id ? { ...todo, newTodoText } : todo)),
      });
    } catch (e) {
      console.log('Fail to edit todo', e);
    }
  }
  handleSearchChange(searchText) {
    debugger;
    this.setState({ searchQuery: searchText });
  }
  getFilteredTodos() {
    debugger;
    const { todos, searchQuery } = this.state;
    let filteredTodos = todos;
    if (searchQuery) {
      filteredTodos = todos.filter((todo) => todo.name.includes(searchQuery.trim()));
    }
    return filteredTodos;
  }
  async deleteTodo(id) {
    try {
      await todoApi.delete(id);
      this.setState({
        todos: this.state.todos.filter((todo) => todo.id !== id),
      });
    } catch (e) {
      console.log('Fail to delete todo', e);
    }
  }
  async handleCompletedTodo(id, completed) {
    const data = {
      completed,
    };
    await todoApi.update(id, data);
    this.setState({
      todos: this.state.todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo)),
    });
  }
  openModal() {
    this.modal.openModal();
  }
  handleShowCompleted(isShow) {
    this.element.querySelector('.todo-list--completed').style.display = isShow ? 'block' : 'none';
  }
  render() {
    const filteredTodos = this.getFilteredTodos();
    const completedTodos = this.state.todos.filter((x) => x.completed);
    return createElement(
      'div',
      { className: 'todos-app' },
      createElement(
        'h1',
        { className: 'title' },
        createElement('span', { className: 'highlight' }, 'Smatyx'),
        ' Todos App'
      ),
      createElement(
        'div',
        { className: 'todo-header' },
        createElement(TodoFilter, { onSearch: this.handleSearchChange.bind(this) }),
        createElement('button', { className: 'btn btn-add', onclick: this.openModal }, 'Add Todos')
      ),
      this.state.isModalOpen &&
        createElement(TodoForm, {
          onSubmit: this.addTodo,
          onCancel: this.closeModal,
          onInputChange: this.handleInputChange.bind(this),
          inputValue: this.state.newTodo,
        })
      // createElement(TodoList, {
      //   todos: filteredTodos,
      //   onDelete: this.deleteTodo,
      //   onCompleted: this.handleCompletedTodo,
      //   onEdit: this.editTodo,
      //   onAdd: this.addTodo,
      // }),
      // createElement(CompletedButton, {
      //   showCompleted: this.handleShowCompleted,
      //   count: completedTodos.length,
      // }),
      // createElement(TodoList, {
      //   className: 'todo-list--completed',
      //   todos: completedTodos,
      //   onDelete: this.deleteTodo,
      //   onCompleted: this.handleCompletedTodo,
      //   onEdit: this.editTodo,
      //   onAdd: this.addTodo,
      // })
    );
  }
}
export default TodoApp;
