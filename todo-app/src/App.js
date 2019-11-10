import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';

const url = 'https://a1uixots8j.execute-api.ap-northeast-1.amazonaws.com/latest/todo';

// Themeごとのスタイル定義
const Themes = {
  light: {
    color: '#000',
    backgroundColor: '#fff',
  },
  dark: {
    color: '#fff',
    backgroundColor: '#000',
  },
};

// 現在選択されているThemeを共有するContext
export const ThemeContext = createContext(Themes.light);

function App() {
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(0);
  // 現在選択されているtheme
  const [theme, setTheme] = useState('light');

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

  const handleTheme = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className="App">
      {/* Providerの配下でContextが共有される */}
      <ThemeContext.Provider value={Themes[theme]}>
        {/* Themeの選択 */}
        <div className="theme-selector">
          <label><input type="radio" name="theme" value="light" defaultChecked={theme === 'light'} onChange={handleTheme} />Light</label>
          <label><input type="radio" name="theme" value="dark" defaultChecked={theme === 'dark'} onChange={handleTheme} />Dark</label>
        </div>

        <TodoForm onSave={handleCreate} />

        {todos.map(item => (
          <Todo key={item.ID} {...item} onSave={handleUpdate} onDelete={handleDelete} />)
        )}
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
