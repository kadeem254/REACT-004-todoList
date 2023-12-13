import { useEffect, useRef, useState } from "react";
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
 */
function TodoItem({todoObject, todoToggleCallback, todoEditCallback, todoDeleteCallback }) {
  const [editText, setEditText] = useState(todoObject.text);
  const [isEditing, setIsEditing] = useState(false);

  const editFieldRef = useRef(null);

  const toggleCompleted = (event) => {
    todoToggleCallback( event, todoObject.id )
    console.log('toggle from <TodoItem>');
  }

  useEffect(
    ()=>{
      // focus the input field if isEditing is true
      if( isEditing == true ){
        editFieldRef.current.focus();
      }
    },
    [isEditing]
  )

  const toggleEditMode = (event) => {
    setIsEditing(
      (currentState) => {
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
    return;
  }

  /**
   * Handle key presses during editiing
   * @param {Event} event 
   */
  const handleKeyPress = (event)=>{
    if( event.key === 'Enter' ){
      saveTodoEdit();
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
      setIsEditing(false);
      return;
    }

    // if not valid release edit mode and reset value of edit text
    setIsEditing(false);
    setEditText(todoObject.text);
    return
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
          {
            isEditing 
            ?(
              <FontAwesomeIcon
                icon={faFloppyDisk}
                onClick={toggleEditMode}
              ></FontAwesomeIcon>
            )
            :(
              <FontAwesomeIcon
                icon={faPenToSquare}
                onClick={saveTodoEdit}
              ></FontAwesomeIcon>
            )
          }
        </div>

        <div 
          className="icon bg-mindaro text-indigo_dye flex justify-center
          items-center w-8 h-8 rounded-full cursor-pointer"
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