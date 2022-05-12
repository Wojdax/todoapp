import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

export const App = () => {
  const [todos, setTodos] = useState([{
    text: "Wstac z lozka",
    isDone: false
  }])

  const addTodo2 = (text) =>{
    const newTodos = [...todos, {text}];
    setTodos(newTodos);
  }

  function addTodo(text){
    const newTodos = [...todos, {text}];
    setTodos(newTodos);
  }

  return (
    <div className='app'>
      <div className='container'>
        <h1 className='text-center mb-4'>Todo List</h1>
        <FormTodo addTodo={addTodo} />
        {todos.map((x)=>(
          <div>{x.text}</div>
          ))}
      </div>
    </div>
  )
}

export const FormTodo = ({ addTodo }) => {
  const [value, setValue] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value) return
    addTodo(value);
    setValue("");
  }

  return (
    <div>
      <h3>Add Todo</h3>
      <input type="text" value={value} onChange={e => setValue(e.target.value)}></input>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}