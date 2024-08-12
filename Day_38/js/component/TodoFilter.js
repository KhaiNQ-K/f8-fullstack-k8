import { Component, createElement } from '../core.js';
import { replaceCsrf, debounce } from '../utils.js';

class TodoFilter extends Component {
  constructor(props) {
    super(props);
  }
  handleSearch(e) {
    console.log('handleSearch', e.target.value);
    this.props.onSearch(replaceCsrf(e.target.value.trim()));
  }
  render() {
    return createElement(
      'div',
      { className: 'search-form' },

      createElement('input', {
        type: 'text',
        className: 'search-input',
        placeholder: 'Search todos',
        oninput: debounce(this.handleSearch.bind(this), 1000),
        value: this.props.searchQuery,
      }),
      createElement(
        'button',
        { type: 'submit', className: 'btn btn-search' },
        createElement('i', { className: 'fas fa-search' })
      )
    );
  }
}
export default TodoFilter;
