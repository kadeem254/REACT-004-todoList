import { useState } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";
import * as FACTORY from "../utils/factory";

function TodoWrapper(){
  const [todos, setTodos] = useState(()=>{
    // temporary data
    return FACTORY.generateFakeTodos(30);
  });

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
              ></TodoItem>
            )
          )
        }
      </ul>
    </div>
  )
}

export default TodoWrapper;