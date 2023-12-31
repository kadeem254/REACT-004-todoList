import { useEffect, useRef, useState } from "react";
import {toast} from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faFloppyDisk, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import CheckBox from "./CheckBox";

/**
 * Component that handles rendering of todo items
 * @param {Object} props
 * @param {Object} props.todoObject - Object containing information about the
 * given task.
 * @param {string} props.todoObject.id - the uuid key of the task
 * @param {string} props.todoObject.text - the text for the task
 * @param {boolean} props.todoObject.completed - boolean representing whether the task is
 * completed or not.
 * @param {number} props.todoObject.createdOn - epoch time representing when the task
 * was created.
 * @param {number} props.todoObject.updatedOn - epoch time representing the last time this
 * task was updated.
 * 
 * @param {Function} props.todoToggleCallback - function responsible for updating
 * a task when its completed state is toggled.
 * @param {Function} props.todoEditCallback - function responsible for updating
 * a task when its text is changed.
 * @param {Function} props.todoDeleteCallback - function responsible for deleting
 * a task from the main todos list.
 */
function TodoItem({todoObject, todoToggleCallback, todoEditCallback, todoDeleteCallback }) {
  const [editText, setEditText] = useState(todoObject.text);
  const [isEditing, setIsEditing] = useState(false);

  const editFieldRef = useRef(null);

  const toggleCompleted = (event) => {
    todoToggleCallback( event, todoObject.id )
  }

  useEffect(
    ()=>{
      // focus the input field if isEditing is true
      if( isEditing == true ){
        editFieldRef.current.focus();
      }
      // actions to perform if isEditing is false
      else{
        // update the editText with changes made to the updates
        setEditText( todoObject.text );
      }
    },
    [isEditing]
  )

  const toggleEditMode = (event) => {
    // if currently editing save and change state
    // if editing go into edit mode
    setIsEditing(
      (currentState) => {
        if( currentState ){
          saveTodoEdit();
        }
        const nextState = !currentState;
        return nextState;
      }
    );

    return;
  }

  /**
   * Confirms text is valid to be used as the todo text
   * @param {String} text 
   */
  const isValidText = (text) => {
    if( typeof text !== "string" ){
      return false;
    }

    if( text.trim().length <= 0 ){
      return false;
    }

    return true;
  }

  /**
   * Handle field updates during editing
   * @param {Event} event 
   */
  const handleTodoEdit = (event) => {
    setEditText( event.target.value );
    return;
  }

  /**
   * Handle input blur during editiing
   * @param {Event} event 
   */
  const handleBlur = (event)=>{
    saveTodoEdit();
    setIsEditing(false);
    return;
  }

  /**
   * Handle key presses during editiing
   * @param {Event} event 
   */
  const handleKeyPress = (event)=>{
    if( event.key === 'Enter' ){
      saveTodoEdit();
      setIsEditing(false);
    }
   
    return;
  }

  /**
   * Handles saving the editted text.
   */
  const saveTodoEdit = () => {
    if( isValidText(editText) ){
      // if valid update text on main todo list
      if( todoEditCallback ){
        todoEditCallback(todoObject.id, editText);
      }
      return;
    }

    // if not valid release edit mode and reset value of edit text
    setEditText(todoObject.text);
    return
  }

  /**
   * handles the deletion logic for the specific taskItem
   * @param {Event} event
   */
  const deleteTodo = (event)=>{
    if( todoDeleteCallback && todoObject.id ){
      todoDeleteCallback(todoObject.id);
    }

    return;
  }

  return (
    <li
      className="flex flex-row items-center gap-2 p-2 bg-indigo_dye text-cream
      rounded-md hover:bg-lapis_lazuli data-[completed=true]:bg-pakistani_green
    data-[completed=true]:hover:bg-sea_green"
      data-completed={todoObject.completed || false}
    >  
      {/* toggle for completion */}
      <div className="flex items-center">
        <CheckBox
          isChecked={todoObject.completed || false}
          toggleCallback={toggleCompleted}
        ></CheckBox>
      </div>

      {/* text for the task item */}
      <div className="flex-grow overflow-hidden">

        {/* conditionally display */}
        {
          isEditing ?
          (
            <input
              ref={editFieldRef}
              className="w-full bg-cream text-indigo_dye px-2 outline-none"
              value={editText}
              type="text"
              onChange={handleTodoEdit}
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
            />
          )
          :(
            <p className="whitespace-nowrap overflow-hidden text-ellipsis">
              {todoObject.text}
            </p>
          )
        }
      </div>

      {/* Options for modifying the task item */}
      <div className="flex flex-row gap-2">
        <div 
          className="icon bg-mindaro text-indigo_dye flex justify-center
          items-center w-8 h-8 rounded-full cursor-pointer"
          onClick={toggleEditMode}
        >
          <FontAwesomeIcon
            icon={isEditing ? faFloppyDisk : faPenToSquare}
          ></FontAwesomeIcon>
        </div>

        <div 
          className="icon bg-mindaro text-indigo_dye flex justify-center
          items-center w-8 h-8 rounded-full cursor-pointer"
          onClick={deleteTodo}
        >
          <FontAwesomeIcon
            icon={faTrashCan}
          ></FontAwesomeIcon>
        </div>

      </div>
    </li>
  );
}

export default TodoItem;