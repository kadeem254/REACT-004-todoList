import { faker } from '@faker-js/faker';

/**
 * Returns an array of todo items
 * @param {number} count - number of items to create
 */
export function generateFakeTodos( count ){
  const MAX_ITEMS = 100;
  const fakeData = [];

  if( typeof count !== "number" || count <= 0 || count > MAX_ITEMS){
    return fakeData;
  }
  
  const createRandomTodo = ()=>{
    return {
      id: crypto.randomUUID(),
      text: faker.lorem.sentence({min: 3, max: 45}),
      completed: faker.datatype.boolean(),
      createdOn: Date.now(),
      updatedOn: Date.now(),
    }
  }
  for(let i = 0; i < count; i++){
    fakeData.push(createRandomTodo());
  }

  return fakeData;
}