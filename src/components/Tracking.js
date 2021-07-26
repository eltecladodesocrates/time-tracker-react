import { useContext } from "react"
import {TasksContext} from './Task'
import CountUp from 'react-countup'

const Tracking = () => {

    const {
        handleStopTrack, handleRemoveTask, handleEndTracking, task, minutes, hours
    } = useContext(TasksContext)

    return (
        <p>
            {task.description}
            <span>{hours}</span>:
            <span>{minutes}</span>:
            <CountUp
            start={0}
            end={59}
            duration={60}
            useEasing={false}
            onEnd={handleEndTracking}
            />
            < button onClick={() => handleStopTrack(task.id)}>S</button>
            <button onClick={() => handleRemoveTask(task.id)}>R</button>
        </p>
    )
}

export default Tracking