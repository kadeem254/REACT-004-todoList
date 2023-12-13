import { useState } from "react";

/**
 * 
 * @param {Object} props
 * @param {Function} props.newTodoCallback - handles creating a new todo item and
 * registering it in the app.
 * @returns 
 */
function AddTodoForm({newTodoCallback}) {
  // holds value of the task/input text.
  const [value, setValue] = useState("");

  /**
   * @param {Event} e
   */
  const handleInputChange = (e) => {
    // update value to what has been typed in
    setValue(e.target.value);
  };

  /**
   * @param {Event} e
   */
  const handleFormSubmission = (e) => {
    // prevent page reload
    e.preventDefault();

    // add new task
    newTodoCallback(value);

    // reset the new task input field
    setValue("");
    return;
  };

  return (
    <div className="fixed left-1/2 bottom-5 w-screen box-border px-2 mx-auto
    bg-purple max-w-2xl min-w-[300px] -translate-x-1/2">
      <form
        className="w-full flex flex-row mx-auto"
        onSubmit={handleFormSubmission}
      >
        <input
          className="inline-block flex-grow p-2 rounded-s-xl outline-none
        bg-cream border-2 border-indigo_dye focus:bg-mindaro focus:border-cerulean"
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder="Create New Task"
        />
        <button
          className="flex items-center justify-center px-5 bg-lapis_lazuli
        text-cream rounded-e-xl leading-4 hover:bg-cerulean focus:bg-indigo_dye
        outline-none"
          type="submit"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTodoForm;
