import { Component, createElement } from '../core.js';
import TodoItem from './TodoItem.js';

class TodoList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return createElement(
      'div',
      { className: this.props.className ? this.props.className + ' todo-list' : 'todo-list' },
      ...this.props.todos.map((todo) =>
        new TodoItem({
          id: todo.id,
          name: todo.name,
          completed: todo.completed,
          onDelete: this.props.onDelete,
          onEdit: this.props.onEdit,
          onCompleted: this.props.onCompleted,
        }).render()
      )
    );
  }
}
export default TodoList;
