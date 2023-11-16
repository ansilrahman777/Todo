import React from 'react'
import './Todo.css'
import { useState ,useRef,useEffect} from 'react'  
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";


function Todo() {
  const [todo , setTodo] = useState('');
  const [todos,setTodos] = useState([])
  const [editId ,setEditId] = useState(0)

  const handleSubmit =(e) =>{
    e.preventDefault();
  }

  const addTodo = () => {
    if (todo.trim() !== '') {
      const isDuplicate = todos.some((item) => item.list === todo);
      if (!isDuplicate) {
        setTodos([...todos,{list:todo,id:Date.now(),status:false}])
        setTodo('')
      } else {
        alert('Todo already exists!'); 
      }
    }
    if (todo.trim() !== '') {
      if(editId){
        const editTodo = todos.find((todo)=>todo.id === editId)
        const updateTodo = todos.map((dos)=>dos.id === editTodo.id
        ? (dos ={id :dos.id,list : todo})
        : (dos ={id :dos.id,list : dos.list}))
        setTodos(updateTodo)
        setEditId(0);
        setTodo('')
      }
    }
  }

  const inputRef = useRef('null')

  useEffect(()=>{
    inputRef.current.focus()  
  })

  const onDelete =(id)=>{
    setTodos(todos.filter((dos) => dos.id !== id))
  }

  const onComplete =(id)=>{
    let complete = todos.map((list)=>{
      if (list.id === id){
        return({...list,status:!list.status})
      }  
      return list 
    })
    setTodos(complete)
  }
  
  const onEdit = (id)=>{
    const editTodo = todos.find((dos)=> dos.id === id)
    setTodo(editTodo.list)
    setEditId(editTodo.id)
  }

  return (
    <div className='container'>
        <h2>ToDo App</h2>
        <form className='form-group' onSubmit={handleSubmit}>
            <input type="text" value={todo} ref={inputRef} placeholder='Enter you To Do' className='form-control' onChange={(event)=>setTodo(event.target.value)}/>
            <button className='btn btn-dark' onClick={addTodo}>{editId ? 'EDIT':'ADD'}</button>
        </form>
        <div className='list-group'>
            <ul>
              {
                todos.map((dos)=>(
                  <li className='list-items'>
                  <div className='list-item-list' id={dos.status ? 'list-item' : ''}>{dos.list}</div>
                  <span>
                    <IoMdDoneAll className='list-item-icons' id='complete' title='Complete' onClick={()=>onComplete(dos.id)}/>
                    <FiEdit className='list-item-icons'  id='edit' title='Edit' onClick={()=>onEdit(dos.id)}/>
                    <MdDelete className='list-item-icons' id='delete' title='Delete' onClick={()=>onDelete(dos.id)}/>
                  </span>
                  </li>
                ))
              }
            </ul>
        </div>
    </div>
  )
}

export default Todo 
