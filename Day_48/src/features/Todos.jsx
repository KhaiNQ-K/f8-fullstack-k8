import { useEffect, useState } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import todoApi from '../api/todoApi';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSubmitForm = async (payload) => {
    try {
      setLoading(true);
      const { data, message } = await todoApi.addTodo({ todo: payload });
      setTodos([data, ...todos]);
      setLoading(false);
      toast.success(message);
    } catch (err) {
      toast.error('Có lỗi xảy ra khi thêm todo');
      console.log(err);
    }
  };
  const handleSearchTodo = async (payload) => {
    try {
      if (payload) {
        setLoading(true);
        const { data } = await todoApi.getTodos({ q: payload });
        setTodos(data?.listTodo);
        setLoading(false);
      } else {
        getTodos();
      }
    } catch (err) {
      toast.error('Có lỗi xảy ra khi tìm kiếm todo');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const getTodos = async () => {
    setLoading(true);
    const { data } = await todoApi.getTodos();
    setTodos(data?.listTodo);
    setLoading(false);
  };
  const handleUpdateTodo = async (payload) => {
    try {
      setLoading(true);
      const { data, message } = await todoApi.updateTodo(payload._id, {
        todo: payload.todo,
        isCompleted: Boolean(payload.isCompleted),
      });
      if (data) {
        const newTodos = todos.map((todo) => {
          if (todo._id === data._id) {
            return data;
          }
          return todo;
        });
        console.log(newTodos);
        setTodos(newTodos);
      }
      setLoading(false);
      toast.success(message);
    } catch (err) {
      toast.error('Có lỗi xảy ra khi cập nhật todo');
      console.log(err);
    }
  };
  const handleDeleteTodo = async (id) => {
    try {
      if (window.confirm('Bạn có chắc chắn muốn xoá todo này ?')) {
        setLoading(true);
        const { message } = await todoApi.deleteTodo(id);
        const newTodos = todos.filter((todo) => todo._id !== id);
        setTodos(newTodos);
        setLoading(false);
        toast.error(message);
      }
    } catch (err) {
      toast.error('Có lỗi xảy ra khi xoá todo');
      console.log(err);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <>
      {loading && <Loading />}
      <div className="flex justify-center items-center mt-8 text-white font-bold flex-wrap">
        <div className="container bg-primary p-4 flex flex-col justify-center items-center">
          <h3 className="text-xl mb-2">Welcome to Todo App!</h3>
          <TodoForm onSubmit={handleSubmitForm} onSearch={handleSearchTodo} />
          <TodoList todos={todos} onUpdate={handleUpdateTodo} onDelete={handleDeleteTodo} />
        </div>
      </div>
    </>
  );
};

export default Todos;
