import { useState } from 'react';

export default function CheckList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if(input.trim() !== '') {
      setTasks([...tasks, { text: input.trim(), done: false }]);
      setInput('');
    }
  };

  const toggleDone = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  return (
    <div>
      <h2>Check List</h2>
      <input 
        type="text" 
        placeholder="Nova tarefa" 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        onKeyDown={e => e.key === 'Enter' && addTask()}
        style={{ background: 'black', color: 'lime', border: '1px solid lime', padding: '0.3rem' }}
      />
      <button onClick={addTask} style={{ marginLeft: '0.5rem' }}>Adicionar</button>
      <ul>
        {tasks.map((task, i) => (
          <li key={i} onClick={() => toggleDone(i)} style={{ cursor: 'pointer', textDecoration: task.done ? 'line-through' : 'none' }}>
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}