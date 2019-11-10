import React, { useState } from 'react';
import './Todo.css';

function TodoForm(props = { Done: false, Content: '' }) {
  const [done, setDone] = useState(!!props.Done);
  const [content, setContent] = useState(props.Content || '');

  const handleSave = () => {
    const id = props.ID || 'hoge';
    props.onSave({
      ...props,
      ID: id,
      Done: done,
      Content: content,
    });

    setDone(false);
    setContent('');
  };

  return (
    <div className="todo">
      <div className="check">
        <input type="checkbox" checked={done} onChange={e => setDone(e.target.checked)} />
      </div>
      <div className="body">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className="btn" onClick={handleSave}>Save</button>
      {props.ID && (
        <button className="btn" onClick={props.onCancel}>Cancel</button>
      )}
    </div>
  );
}

export default TodoForm;
