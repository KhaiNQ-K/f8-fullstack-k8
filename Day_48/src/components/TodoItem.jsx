import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEdit, setEdit] = useState(false);
  const [todoItem, setTodoItem] = useState({});
  const handleEditForm = () => {
    setEdit(true);
  };
  const handleChangeCheckbox = (e) => {
    let checkbox = e.target.checked;
    setTodoItem({ ...todoItem, isCompleted: checkbox });
  };
  useEffect(() => {
    setTodoItem(todo);
  }, [todo]);
  return (
    <li className="list-none bg-white rounded px-8 py-6">
      <input
        type="text"
        readOnly={!isEdit}
        className={`appearance-none border rounded  w-full py-2 px-3 
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline
            font-normal
            text-lg ${todoItem.isCompleted ? 'line-through' : ''}`}
        value={todoItem.todo ?? ''}
        onChange={(e) => setTodoItem({ ...todoItem, todo: e.target.value })}
      />
      <div className="flex items-center justify-between mt-4">
        {isEdit && (
          <div className="flex items-center gap-2">
            <label htmlFor="completed" className="text-black font-normal">
              {todoItem.isCompleted ? 'Completed' : 'Not Completed'}
            </label>
            <input
              type="checkbox"
              id="completed"
              className="form-checkbox h-5 w-5 text-gray-600 "
              checked={todoItem.isCompleted}
              onChange={handleChangeCheckbox}
            />
          </div>
        )}
        <div className="flex items-center gap-3">
          {!isEdit && (
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded "
              onClick={handleEditForm}
            >
              Sửa
            </button>
          )}
          {isEdit && (
            <>
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded"
                onClick={() => setEdit(false)}
              >
                Thoát
              </button>
              <button
                className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded "
                onClick={() => {
                  onUpdate?.(todoItem);
                  setEdit(false);
                }}
              >
                Update
              </button>
            </>
          )}
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
            onClick={() => {
              onDelete?.(todoItem._id);
            }}
          >
            Xoá
          </button>
        </div>
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
};

export default TodoItem;
