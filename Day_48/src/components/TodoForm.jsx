import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDebounce } from '../hooks/useDebounce';
const DEBOUNCE_TIMMER = 1000;

const TodoForm = ({ onSubmit, onSearch }) => {
  const [todo, setTodo] = useState('');
  const [isSearch, setSearch] = useState(false);
  const debounce = useDebounce(todo, DEBOUNCE_TIMMER);
  useEffect(() => {
    (async () => {
      if (!isSearch) return;
      try {
        if (debounce) {
          await onSearch(debounce);
        } else {
          await onSearch('');
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [debounce]);
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setSearch(false);
    onSubmit?.(todo);
    setTodo('');
  };
  const handleSearchTodo = () => {
    if (!isSearch) {
      setSearch(true);
    }
    onSearch?.(todo);
  };
  useEffect(() => {
    if (isSearch) {
      toast.info('Đã chuyển qua chế độ tìm kiếm');
      return;
    }
  }, [isSearch]);
  return (
    <form onSubmit={handleSubmitForm}>
      <div className="flex border-b border-teal-500 py-2 relative ">
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder={isSearch ? 'Tìm kiếm todo' : 'Thêm một việc làm mới'}
          autoFocus
          className="appearance-none bg-transparent font-bold border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none text-white"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          value={todo ?? ''}
        />
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-700 text-white rounded font-bold mr-3 px-2 py-2 flex-shrink-0 focus:outline-none focus:shadow-outline"
        >
          Thêm mới
        </button>
        <button
          type="button"
          className="bg-orange-500 hover:bg-orange-700 
          text-white rounded font-bold mr-3 px-2 py-2 flex-shrink-0 
          focus:outline-none focus:shadow-outline
          absolute
          left-full
          w-max
          "
          onClick={handleSearchTodo}
        >
          Tìm kiếm
        </button>
      </div>
    </form>
  );
};

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default TodoForm;
