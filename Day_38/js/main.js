import { render } from './core.js';
import TodoApp from './component/TodoApp.js';

const app = new TodoApp();
// render(app.render(), document.getElementById('app'));
app.mount(document.getElementById('app'));
