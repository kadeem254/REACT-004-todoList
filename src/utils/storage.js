import { generateFakeTodos } from "./factory";

const LOCAL_STORAGE_KEY = "ReactTodoAppStore1412230914";

export async function fetchTodos() {
  return new Promise((resolve, reject) => {
    // check if any items are saved in local storage
    let data = localStorage.getItem(`${LOCAL_STORAGE_KEY}`);

    if (null === data) {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}`, JSON.stringify([]));
      resolve([]);
    }

    // return the currently saved todos;
    try {
      // the data should be in string form
      const todos = JSON.parse(data);
      resolve(todos)
    } catch (error) {
      // if any errors just return an empty array.
      resolve([])
    }
  });
}

export function saveTodos(todosArray) {
  localStorage.setItem(`${LOCAL_STORAGE_KEY}`, JSON.stringify(todosArray));
  return;
}

/**
 * Populate local storage with fake data
 * @param {number} size 
 */
function setFakeLocalStorageData(size = 5){
  const dummyData = generateFakeTodos(size);
  localStorage.setItem( `${LOCAL_STORAGE_KEY}`, JSON.stringify(dummyData) );
  return;
}
