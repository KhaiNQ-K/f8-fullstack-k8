import { Component, createElement } from '../core.js';
import { replaceCsrf } from '../utils.js';

class TodoForm extends Component {
  constructor(props) {
    super(props);
  }
  handleSubmit(e) {
    debugger;
    e.preventDefault();
    //get input value
    const newTodoText = e.target[0].value;
    if (newTodoText.trim() === '') return;
    if (this.props.isEdit) {
      this.props.onUpdate(newTodoText);
    } else {
      this.props.onAdd(newTodoText);
    }
  }
  handleCancel() {
    this.closeModal();
  }

  render() {
    return createElement(
      'div',
      { className: 'modal-container' },
      createElement('div', { className: 'modal-overlay' }),
      createElement(
        'div',
        { className: 'modal-content' },
        createElement(
          'form',
          { className: 'todo-form', onsubmit: this.handleSubmit.bind(this) },

          createElement('input', {
            type: 'text',
            className: 'todo-input',
            placeholder: 'Add todo...',
            required: true,
            value: this.props.isEdit ? this.props.todo.name : '',
          }),
          createElement(
            'div',
            { className: 'btn-group' },
            createElement('button', { type: 'submit', className: 'submit-btn' }, 'Save'),
            createElement(
              'button',
              { type: 'button', className: 'cancel-btn', onclick: this.props.onCancel },
              'Cancel'
            )
          )
        )
      )
    );
  }
}
export default TodoForm;
