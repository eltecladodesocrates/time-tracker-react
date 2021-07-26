import React, {useContext} from 'react'
import {TimeAppContext} from '../context/TimeApp'

import Task from './Task'

const Tasks = () => {

    const {tasks} = useContext(TimeAppContext)

    return (
        <>
            {tasks.map(task => (
                <Task key={task.id} task={task}/>
            ))}
        </>
    )
}

export default Tasks