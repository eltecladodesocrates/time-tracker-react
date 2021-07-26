import React, {useState} from 'react'

export const TimeAppContext = React.createContext()

const TimeApp = ({children}) => {

  const dataTasks = JSON.parse(localStorage.getItem('tasks'))
  const [tasks, setTasks] = useState(dataTasks || [])

  return (
    <TimeAppContext.Provider value={{tasks, setTasks}}>
        {children}
    </TimeAppContext.Provider>
  )
}

export default TimeApp