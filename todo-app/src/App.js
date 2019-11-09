import React, { useState } from 'react';

import './App.css';
import Todo from './components/Todo';

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

  return (
    <div className="App">
      {todos.map(item => (<Todo key={item.ID} {...item} />))}
    </div>
  );
}

export default App;
