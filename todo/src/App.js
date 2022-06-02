import './App.css';
import { useState } from 'react';
import { Input } from 'antd';

import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

export const App = () => {
  const [todos, setTodos] = useState([{
    id: new Date().getTime(),
    title: "Obiad",
    descrption: "Lasagne i zupa ogórkowa",
    isDone: false,
    isEditable: false
  }])

  const addTodo = (todo) => {
    const newTodos = [...todos, { id: new Date().getTime(), title: todo.title, descrption: todo.descrption, isDone: false }];
    setTodos(newTodos);
  }

  const markDone = (id) => {
    const newTodos = todos.map((todo) => ({
      ...todo,
      isDone: todo.id === id ? !todo.isDone : todo.isDone
    }))
    setTodos(newTodos)
  }

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const handleEdit = (id) => {
    const newTodos = todos.map((todo) => ({
      ...todo,
      isEditable: todo.id === id ? !todo.isEditable : todo.isEditable
    }))
    setTodos(newTodos)
  }

  const handleToDoTitleChange = (id, e) => {
    const newTodos = todos.map((todo) => ({
      ...todo,
      title: todo.id === id ? e.target.value : todo.title
    }))
    setTodos(newTodos)
  }

  const handleToDoDescriptionChange = (id, e) => {
    const newTodos = todos.map((todo) => ({
      ...todo,
      descrption: todo.id === id ? e.target.value : todo.descrption
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
              <input type="checkbox" id={todo.id} key={todo.id} checked={todo.isDone} onClick={() => markDone(todo.id)} />
            </div>
            <div>
              {<Input value={todo.title} disabled={!todo.isEditable} onChange={(e) => handleToDoTitleChange(todo.id, e)} className={(todo.isDone && !todo.isEditable) ? 'line-through' : ''} />}
              <Input value={todo.descrption} disabled={!todo.isEditable} onChange={(e) => handleToDoDescriptionChange(todo.id, e)} className={todo.isDone && !todo.isEditable ? 'line-through' : ''} />
            </div>
            <div><EditOutlined onClick={() => handleEdit(todo.id)} /><DeleteOutlined onClick={() => handleDelete(todo.id)} /></div>
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
      <Input placeholder='Tytuł' type="text" value={title} onChange={e => setTitle(e.target.value)}></Input>
      <Input placeholder='Opis...' type="text" value={descrption} onChange={e => setDescription(e.target.value)}></Input>
      <button onClick={handleSubmit}>Dodaj</button>
    </div>
  )
}