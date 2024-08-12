import { Component, createElement } from '../core.js';

class TodoItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return createElement(
      'div',
      { className: 'todo-item' },
      createElement(
        'div',
        { className: 'todo-inner' },
        createElement('span', { className: 'todo-text' }, this.props.name),
        createElement(
          'div',
          { className: 'todo-action' },
          createElement(
            'button',
            { className: 'btn btn-remove', onclick: () => this.props.onDelete(this.props.id) },
            createElement('i', { className: 'fas fa-trash' })
          ),
          createElement(
            'button',
            {
              className: 'btn btn-edit',
              onclick: () => this.props.onEdit(this.props.id),
            },
            createElement('i', { className: 'fas fa-pen-to-square' })
          ),
          createElement(
            'button',
            {
              className: 'btn btn-done',
              onclick: () => this.props.onCompleted(this.props.id, !this.props.completed),
            },
            createElement('img', { className: 'img-icon', src: './assets/img/icon-completed.svg' })
          )
        )
      )
    );
  }
}
export default TodoItem;
