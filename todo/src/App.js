import './App.css';
import { useState } from 'react';

import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

export const App = () => {
  const [todos, setTodos] = useState([{
    id: new Date().getTime(),
    title: "Obiad",
    descrption: "Lasagne i zupa ogórkowa",
    isDone: false
  }])

  const addTodo = (todo) => {
    const newTodos = [...todos, { id: new Date().getTime(), title: todo.title, descrption: todo.descrption, isDone: false }];
    setTodos(newTodos);
  }

  const markDone = (e) => {
    const newTodos = todos.map((todo) => ({
      ...todo,
      isDone: todo.id.toString() === e.target.id.toString() ? !todo.isDone : todo.isDone
    }))
    setTodos(newTodos)
  }

  return (
    <div className='app'>
      <div className='container'>
        <FormTodo addTodo={addTodo} />
        {todos.map((todo) => (
          <div key={todo.id}>
            <div>
              <input type="checkbox" id={todo.id} key={todo.id} onClick={markDone} />
            </div>
            <div>
              <h4 className={todo.isDone ? 'line-through' : ''}>{todo.title}</h4>
              <p className={todo.isDone ? 'line-through' : ''}>{todo.descrption}</p>
            </div>
            <div><EditOutlined /><DeleteOutlined /></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const FormTodo = ({ addTodo }) => {
  const [title, setTitle] = useState("")
  const [descrption, setDescription] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !descrption) return
    addTodo({ title: title, descrption: descrption });
    setTitle("");
    setDescription("");
  }

  return (
    <div>
      <h3>MOJE ZADANIA</h3>
      <input placeholder='Tytuł' type="text" value={title} onChange={e => setTitle(e.target.value)}></input>
      <input placeholder='Opis...' type="text" value={descrption} onChange={e => setDescription(e.target.value)}></input>
      <button onClick={handleSubmit}>Dodaj</button>
    </div>
  )
}