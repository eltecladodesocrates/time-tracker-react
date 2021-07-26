import React, {useState, useContext, useEffect} from 'react'
import {TimeAppContext} from '../context/TimeApp'
import moment from 'moment'

import NotTracking from './NotTracking'
import Tracking from './Tracking'

export const TasksContext = React.createContext()

const Task = ({task}) => {

  const {tasks, setTasks} = useContext(TimeAppContext)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)

  const handleStartTrack = (id) => {

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.start = moment().valueOf()
        task.tracking = true
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const handleStopTrack = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.end = moment().valueOf()
        task.time = Math.floor(task.time + ((task.end - task.start) / 1000))
        task.tracking = false
      }
      return task
    })
    setTasks(updatedTasks)
    setMinutes(0)
    setHours(0)
  }

  const handleRemoveTask = (id) => {
    const updatedTasks = tasks.filter((task) => id !== task.id)
    setTasks(updatedTasks)
  }

  const handleEndTracking = ({ reset, start }) => {

    setMinutes(minutes + 1)
    if (minutes === 59) {
      setHours(hours + 1)
      setMinutes(0)
    }
    reset()
    start()

  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  })
  return (
    <TasksContext.Provider 
        value={{
            handleStartTrack,
            handleStopTrack, 
            handleRemoveTask, 
            handleEndTracking, 
            task,
            minutes,
            hours
        }}>
        <div>
          {!task.tracking ?
            <NotTracking />:
            <Tracking />
          }
        </div>
    </TasksContext.Provider>
  )
}

export default Task