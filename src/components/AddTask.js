import React, {useState, useContext} from 'react'
import uuid from 'uuid'

import {TimeAppContext} from '../context/TimeApp'

const AddTask = () => {

  const [description, setDescription] = useState('')
  const {tasks, setTasks} = useContext(TimeAppContext)

  const handelAddTask = () => {

    setTasks([
      ...tasks,
      {
        id: uuid(),
        description,
        tracking: false,
        start: 0,
        end: 0,
        time: 0
      }
    ])
    setDescription('')

  }

  return (
    <>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={handelAddTask}>Add Task</button>
    </>
  )
}

export default AddTask