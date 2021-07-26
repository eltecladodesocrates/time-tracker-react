import { useContext } from "react"
import {TasksContext} from './Task'

const NotTracking = () => {

    const {handleStartTrack, handleRemoveTask, task} = useContext(TasksContext)

    return (
        <p>
            {task.description}
            < span > {Math.floor(task.time / 3600)}</span>:
            <span>{Math.floor(task.time / 60) - (60 * Math.floor(task.time / 3600))}</span>:
            <span>{task.time < 60 ? task.time : task.time - (60 * Math.floor(task.time / 60))}</span>
            <button onClick={() => handleStartTrack(task.id)}>T</button>
            <button onClick={() => handleRemoveTask(task.id)}>R</button>
        </p>

    )
}

export default NotTracking