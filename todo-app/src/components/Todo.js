import React from 'react';
import './Todo.css';

function Todo(props) {
  return (
    <div className="todo">
      <div className="check">
        {props.Done && (<span>✓</span>)}
      </div>
      <div className="body">
        <div className="header">
          <span className="date">CreatedBy: {props.CreatedBy}</span>
          <span className="date">UpdatedBy: {props.UpdatedBy}</span>
        </div>
        <div className="content">{props.Content}</div>
      </div>
      <div className="actions">
        <button className="btn">Edit</button>
        <button className="btn">Delete</button>
      </div>
    </div>
  );
}

export default Todo;
