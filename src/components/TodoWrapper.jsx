import { useEffect, useState } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";
import * as FACTORY from "../utils/factory";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { fetchTodos, saveTodos } from "../utils/storage";

function TodoWrapper(){
  // monitor if todos have been loaded from storage.
  const [storageLoaded, setStorageLoaded]=useState(false);
  const [todos, setTodos] = useState([]);

  // on initial load
  useEffect(() =>{
    const fetchData = async()=>{
      
      await fetchTodos().then(
        ( todos ) => {
          setTodos(todos);
          return;
        },
        ( errors ) => {
          setTodos([]);
          return;
        }
      )
      setStorageLoaded(true)
    }
    fetchData();
  },[])

  useEffect(()=>{
    // whenever todos change update the storage
    if( storageLoaded ){
      saveTodos(todos);
    }
  },[todos])


  /**
   * 
   * @param {String} task - text detailing the task.
   * @returns 
   */
  const createNewTask = (task) => {
    // validate task datatype
    if( typeof task !== "string" ){
      console.error("Invalid task type");
      return;
    }

    // validate task length
    let text = task.trim()
    if( text.length <= 0 ){
      // console.error("Task is too short")
      toast(
        `Task must have a minimum of one character.`,
        {
          position: toast.POSITION.TOP_LEFT,
          toastId: `SHORT TODO LENGTH`  
        }
      )
      return;
    }

    // create task object as it will be saved
    const newTaskItem = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdOn: Date.now(),
      updatedOn: Date.now()
    }

    // add to todos list
    setTodos(
      (previousTodos) => {
        const newTodos = [...previousTodos, newTaskItem];
        // console.log(newTodos);
        return newTodos
      }
    )
    return;
  }

  

  /**
   * Handles toggle action for the completed status of a todo task.
   * @param {Event} event
   * @param {Object} targetId - ID for the task to update
   */
  const handleTodoToggle = (event, targetId) => {
    const updatedTodos = todos.map(
      (todo, index ) => {
        // only update the task with the given id.
        if(todo.id === targetId){
          return {
            ...todo,
            completed: !todo.completed
          }
        }

        return todo;
      }
    );

    // update todos list
    setTodos(updatedTodos);

    return;
  }

  /**
   * Handles updating the todo item specified by the id
   * @param {string} id - id of the todo to update.
   * @param {string} newText - the new value to update the todo with.
   * @returns 
   */
  const handleTodoUpdate = (id, newText) => {
    const updatedTodos = todos.map(
      (todo, item)=>{
        if( todo.id === id ){
          return {
            ...todo,
            text: newText,
            updatedOn: Date.now()
          }
        }

        return todo;
      }
    )

    setTodos(updatedTodos);
    return;
  }

  /**
   * Handles deleting the todo item specified by the id
   * @param {string} id - id of the todo to delete.
   * @returns 
   */
  const handleTodoDelete = (id) => {
    setTodos(
      (currentTodos)=>{
        const updatedTodos = currentTodos.filter(
          (todo) => {
            if( todo.id === id ){
              return false;
            }
            return true;
          }
        )

        toast(
          `Todo deleted successfully.`,
          {
            position: toast.POSITION.TOP_LEFT,
            toastId: `TODO DELETE SUCCESS`  
          }
        )

        return updatedTodos
      }
    )
  }

  return(
    <div className="relative">
      <AddTodoForm newTodoCallback={createNewTask}></AddTodoForm>
      <ul id="todo-list" className="flex flex-col gap-2 pb-16">
        {
          todos.map(
            (todo, index) => (
              <TodoItem
                key={todo.id}
                todoObject={todo}
                todoToggleCallback={handleTodoToggle}
                todoEditCallback={handleTodoUpdate}
                todoDeleteCallback={handleTodoDelete}
              ></TodoItem>
            )
          )
        }
      </ul>
      <ToastContainer/>
    </div>
  )
}

export default TodoWrapper;