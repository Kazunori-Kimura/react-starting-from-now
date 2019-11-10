import React, { useState, useContext } from 'react';
import TodoForm from './TodoForm';
import './Todo.css';

import { ThemeContext } from '../App';

function Todo(props) {
  const [edit, setEdit] = useState(false);
  const theme = useContext(ThemeContext);

  const handleUpdate = (data) => {
    setEdit(false);
    props.onSave(data);
  };

  if (edit) {
    return (
      <TodoForm
        {...props}
        onSave={handleUpdate}
        onCancel={() => setEdit(false)}
      />
    );
  }

  return (
    <div className="todo" style={theme}>
      <div className="check">
        {props.Done && (<span>✓</span>)}
      </div>
      <div className="body">
        <div className="header">
          <span className="date">CreatedAt: {props.CreatedAt}</span>
          <span className="date">UpdatedAt: {props.UpdatedAt}</span>
        </div>
        <div className="content">{props.Content}</div>
      </div>
      <button className="btn" onClick={() => setEdit(true)}>Edit</button>
      <button className="btn" onClick={() => props.onDelete(props.ID)}>Delete</button>
    </div>
  );
}

export default Todo;
