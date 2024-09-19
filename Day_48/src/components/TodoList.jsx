import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onUpdate, onDelete }) => {
  return (
    <ul className="list-disc w-full max-w-3xl flex flex-col gap-4 mt-2">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
};

export default TodoList;
