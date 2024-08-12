import todoApi from './api/todoApi.js';
import CompletedButton from './component/CompletedButton.js';
import TodoFilter from './component/TodoFilter.js';
import TodoForm from './component/TodoForm.js';
import TodoList from './component/TodoList.js';
import { createElement, render, Component } from './core.js';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isModalOpen: false,
      isEdit: false,
      todo: {},
      searchQuery: '',
      isShowCompleted: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.addTodo = this.addTodo.bind(this);
  }
  componentDidMount() {
    this.fetchTodos();
    // document.body.appendChild(this.modal.render());
  }
  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false, todo: {}, isEdit: false });
  }

  async fetchTodos() {
    try {
      const todoList = await todoApi.getAll();
      this.setState({ todos: todoList });
    } catch (e) {
      console.log('Fail to fetch todos', e);
    }
  }
  async handleAddTodo(newTodoText) {
    try {
      const data = {
        name: newTodoText,
        completed: false,
      };
      const newTodo = await todoApi.add(data);
      this.setState({ todos: [...this.state.todos, newTodo] });
    } catch (e) {
      console.log('Fail to add todo', e);
    }
    this.closeModal();
  }

  async deleteTodo(id) {
    try {
      await todoApi.delete(id);
      const todos = [...this.state.todos];
      const index = todos.findIndex((todo) => todo.id === id);
      todos.splice(index, 1);
      this.setState({ todos });
    } catch (e) {
      console.log('Fail to delete todo', e);
    }
  }
  handleSearchChange(searchText) {
    this.setState({ searchQuery: searchText });
  }
  getFilteredTodos() {
    const { todos, searchQuery } = this.state;
    let filteredTodos = todos;
    if (searchQuery) {
      filteredTodos = todos.filter((todo) => todo.name.toLowerCase().includes(searchQuery.trim()));
    }
    return filteredTodos.filter((todo) => !todo.completed);
  }
  getCompletedTodos() {
    const { todos, searchQuery } = this.state;
    let completedTodos = todos.filter((todo) => todo.completed);
    if (searchQuery) {
      completedTodos = completedTodos.filter((todo) =>
        todo.name.toLowerCase().includes(searchQuery.trim())
      );
    }
    return completedTodos;
  }
  handleCompletedTodo(id, isCompleted) {
    try {
      const oldTodo = this.state.todos.find((todo) => todo.id === id);
      todoApi.update(id, { ...oldTodo, completed: isCompleted });
      this.setState({
        todos: this.state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: isCompleted } : todo
        ),
      });
    } catch (e) {
      console.log('Fail to update todo', e);
    }
  }
  handleShowCompleted() {
    this.setState({ isShowCompleted: !this.state.isShowCompleted });
  }
  handleEditTodo(id) {
    this.openModal();
    const todo = this.state.todos.find((todo) => todo.id === id);
    this.setState({ todo, isEdit: true });
  }
  async handleUpdateTodo(newTodoText) {
    debugger;
    try {
      const oldTodo = this.state.todo;
      const data = {
        ...oldTodo,
        name: newTodoText,
      };
      const newTodo = await todoApi.update(this.state.todo.id, data);
      this.setState({
        todos: this.state.todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo)),
      });
    } catch (e) {
      console.log('Fail to update todo', e);
    }
    this.closeModal();
  }
  render() {
    debugger;
    const filteredTodos = this.getFilteredTodos();
    const completedTodos = this.getCompletedTodos();
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
        createElement(TodoFilter, {
          onSearch: this.handleSearchChange.bind(this),
          searchQuery: this.state.searchQuery,
        }),
        createElement(
          'button',
          { className: 'btn btn-add', onclick: this.openModal.bind(this) },
          'Add Todos'
        )
      ),
      this.state.isModalOpen &&
        createElement(TodoForm, {
          onUpdate: this.handleUpdateTodo.bind(this),
          onAdd: this.handleAddTodo.bind(this),
          onCancel: this.closeModal,
          isEdit: this.state.isEdit,
          todo: this.state.todo,
        }),
      createElement(TodoList, {
        todos: filteredTodos,
        onDelete: this.deleteTodo.bind(this),
        onCompleted: this.handleCompletedTodo.bind(this),
        onEdit: this.handleEditTodo.bind(this),
      }),
      createElement(CompletedButton, {
        showCompleted: this.handleShowCompleted.bind(this),
        count: completedTodos.length,
        isShowCompleted: this.state.isShowCompleted,
      }),
      this.state.isShowCompleted &&
        createElement(TodoList, {
          className: 'todo-list--completed',
          todos: completedTodos,
          onDelete: this.deleteTodo.bind(this),
          onCompleted: this.handleCompletedTodo.bind(this),
          onEdit: this.handleEditTodo.bind(this),
        })
    );
  }
}
export default TodoApp;
