import { useState } from "react";
import AddTodoForm from "./AddTodoForm";

function TodoWrapper(){
  const [todos, setTodos] = useState([]);

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
      console.error("Task is too short")
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
        console.log(newTodos);
        return newTodos
      }
    )
    return;
  }

  return(
    <div className="relative">
      <AddTodoForm newTodoCallback={createNewTask}></AddTodoForm>
    </div>
  )
}

export default TodoWrapper;