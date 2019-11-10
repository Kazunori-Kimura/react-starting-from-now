import React, { useState } from 'react';
import uuid from 'uuid';
import './App.css';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState([
    {
      ID: 1,
      Content: 'hoge',
      Done: true,
      CreatedBy: (new Date()).toISOString(),
      UpdatedBy: (new Date()).toISOString(),
    },
  ]);

  const handleCreate = data => {
    const now = (new Date()).toISOString();
    data.ID = uuid.v4();
    data.CreatedBy = now;
    data.UpdatedBy = now;

    setTodos([...todos, data]);
  };

  const handleUpdate = data => {
    const now = (new Date()).toISOString();
    data.UpdatedBy = now;

    setTodos(todos.map(item => {
      if (item.ID === data.ID) {
        return data;
      }
      return item;
    }));
  };

  const handleDelete = id => {
    const index = todos.findIndex(item => item.ID === id);
    if (index >= 0) {
      const newList = [...todos];
      newList.splice(index, 1);
      setTodos(newList);
    }
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
