import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';

const url = 'https://a1uixots8j.execute-api.ap-northeast-1.amazonaws.com/latest/todo';

function App() {
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const getTodoes = async () => {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
      });
      
      const res  = await response.json();

      // 作成日時順に返す
      setTodos(res.sort((a, b) => a.CreatedAt < b.CreatedAt ? 1 : -1));
    };

    getTodoes();
  }, [refresh]);

  const handleCreate = data => {
    const createTodo = async () => {
      // ID, CreatedAt, UpdatedAtはAPI側で設定される
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data),
      });

      console.log(response.status);

      setRefresh(Date.now());
    };

    createTodo();
  };

  const handleUpdate = data => {
    const updateTodo = async () => {
      const response = await fetch(`${url}/${data.ID}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          "Content-Type": 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data),
      });

      console.log(response.status);

      setRefresh(Date.now());
    };

    updateTodo();
  };

  const handleDelete = id => {
    const deleteTodo = async () => {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        mode: 'cors',
      });

      console.log(response.status);

      setRefresh(Date.now());
    };

    deleteTodo();
  };

  return (
    <div className="App">
      <TodoForm onSave={handleCreate} />

      {todos.map(item => (
        <Todo key={item.ID} {...item} onSave={handleUpdate} onDelete={handleDelete} />)
      )}
    </div>
  );
}

export default App;
