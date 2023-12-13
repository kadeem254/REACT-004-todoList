import { useState } from 'react'
import TodoWrapper from './components/TodoWrapper'

function App() {
  return (
    <div className='container box-border px-2 sm:mx-auto text-indigo_dye
    max-w-2xl min-w-[300px] flex flex-col gap-5 py-5'>
      <h1 className='text-3xl text-center font-semibold'>My Todo List</h1>
      <TodoWrapper></TodoWrapper>
    </div>
  )
}

export default App
