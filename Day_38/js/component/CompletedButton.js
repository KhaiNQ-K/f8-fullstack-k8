import { Component, createElement } from '../core.js';

export default class CompletedButton extends Component {
  constructor(props) {
    super(props);
  }

  handleShowCompleted(e) {
    e.preventDefault();
    this.props.showCompleted();
  }
  render() {
    return createElement(
      'div',
      { class: 'todo-completed' },
      createElement(
        'button',
        {
          className: `btn btn-show-done ${this.props.isShowCompleted ? 'active' : ''}`,
          onclick: this.handleShowCompleted.bind(this),
        },
        createElement(
          'span',
          { class: 'todo-completed-count' },
          'Completed Todos',
          createElement('span', { className: 'todo-count' }, this.props.count)
        ),
        createElement('img', {
          className: 'img-icon',
          src: './assets/img/icon-arrow.svg',
          alt: '',
          style: `transform: ${this.props.isShowCompleted ? 'rotate(0deg)' : 'rotate(-90deg)'}`,
        })
      )
    );
  }
}
