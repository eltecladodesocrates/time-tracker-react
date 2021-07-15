import React from 'react'
import ReactDOM from 'react-dom'
import CountUp from 'react-countup'

import uuid from 'uuid'
import moment from 'moment'


class TimeTrackerApp extends React.Component {

    state = {
        hrs: 0,
        min: 0,
        tasks: []
    }

    handleAddMinutes = () => {
        this.setState((prevState) => ({ min: prevState.min + 1 }))
    }

    handleAddHours = () => {
        this.setState((prevState) => ({ hrs: prevState.hrs + 1 }))
    }

    handleResetMinutes = () => {
        this.setState(() => ({ min: 0 }))
    }

    handleResetHours = () => {
        this.setState(() => ({ hrs: 0 }))
    }

    handleDeleteTask = (id) => {
        const tasks = this.state.tasks.filter((task) => task.id !== id)
        this.setState(() => ({ tasks }))
    }

    handleTracking = (id) => {
        const tasks = this.state.tasks.map((task) => task)
        tasks.filter((task) => {
            if (task.id === id) {
                task.tracking = true
                task.start = moment().valueOf()
                return task
            }
        })
        this.setState(() => ({ tasks }))

    }

    handleStop = (id) => {
        const tasks = this.state.tasks.map((task) => {
            return task
        })
        tasks.filter((task) => {
            if (task.id === id) {
                task.tracking = false
                task.end = moment().valueOf()
                task.time = task.time + parseInt((task.end - task.start) / 1000)
                console.log((task.end - task.start) / 1000)
                console.log(task.time)

                return task
            }
        })
        this.setState(() => ({ tasks }))

    }

    handleAddTask = (task) => {
        this.setState((prevState) => ({ tasks: prevState.tasks.concat(task) }))
    }

    render() {
        return (
            <div>
                <Header />
                <Tasks
                    handleAddTask={this.handleAddTask}
                    handleTracking={this.handleTracking}
                    handleStop={this.handleStop}
                    handleAddMinutes={this.handleAddMinutes}
                    handleAddHours={this.handleAddHours}
                    handleResetMinutes={this.handleResetMinutes}
                    handleResetHours={this.handleResetHours}
                    handleDeleteTask={this.handleDeleteTask}

                    tasks={this.state.tasks}
                    tracking={this.state.tracking}
                    hrs={this.state.hrs}
                    min={this.state.min}
                />
            </div>
        )
    }
}

const Header = () => (
    <h1>Time Tracker App</h1>
)

const Tasks = (props) => {

    return (
        <div>
            {props.tasks.map((task) => {
                return <Task
                    key={task.id}
                    id={task.id}
                    description={task.description}
                    time={task.time}
                    tracking={task.tracking}
                    hrs={props.hrs}
                    min={props.min}

                    handleTracking={props.handleTracking}
                    handleStop={props.handleStop}
                    handleAddMinutes={props.handleAddMinutes}
                    handleAddHours={props.handleAddHours}
                    handleResetMinutes={props.handleResetMinutes}
                    handleResetHours={props.handleResetHours}
                    handleDeleteTask={props.handleDeleteTask}
                />
            })}
            <AddTask
                handleAddTask={props.handleAddTask}
            />
        </div>
    )
}

const Task = (props) => {

    const handleTracking = () => {
        props.handleTracking(props.id)
    }

    const handleStop = () => {
        props.handleStop(props.id)
        props.handleResetMinutes()
        props.handleResetHours()
    }

    const handleDeleteTask = () => {
        props.handleDeleteTask(props.id)
        props.handleResetMinutes()
        props.handleResetHours()
    }

    return (
        <div>
            <ul>
                <li>
                    {props.description}
                    {props.tracking ?
                        <TimeTracking
                            hrs={props.hrs}
                            min={props.min}

                            handleAddMinutes={props.handleAddMinutes}
                            handleAddHours={props.handleAddHours}
                            handleResetMinutes={props.handleResetMinutes}
                        /> :
                        <TimeTracked
                            time={props.time}
                        />}
                    {!props.tracking ? <button id="track-btn" onClick={handleTracking}>T</button> : <button id="stop-btn" onClick={handleStop}>S</button>}
                </li>
                <button onClick={handleDeleteTask}>D</button>
            </ul>
        </div>
    )
}

const TimeTracked = (props) => {
    return (
        <div>
            {props.time ? Math.floor(props.time / 3600) : 0}:
            {props.time < 3600 ? Math.floor(props.time / 60) : 0}:
            {props.time < 60 ? props.time : props.time - (60 * Math.floor(props.time / 60))}
        </div>
    )
}

const TimeTracking = (props) => {

    return (
        <div>
            <span>{props.hrs}</span>:
            <span>{props.min}</span>:
            <CountUp
                start={0}
                end={59}
                duration={60}
                useEasing={false}
                onEnd={({ reset, start }) => {
                    props.handleAddMinutes()
                    if (props.min === 59) {
                        props.handleAddHours()
                        props.handleResetMinutes()
                    }
                    reset()
                    start()

                }}
            />
        </div>
    )
}

const AddTask = (props) => {

    const handleAddTask = (e) => {
        e.preventDefault()
        const task = {
            id: uuid(),
            description: e.target.addTask.value,
            time: 0,
            trackingTime: 0,
            start: 0,
            end: 0,
            tracking: false,
        }
        props.handleAddTask(task)
        e.target.addTask.value = ''
    }

    return (
        <form onSubmit={handleAddTask}>
            <input type='text' name='addTask' />
            <button>Add Task</button>
        </form>
    )
}

ReactDOM.render(
    <TimeTrackerApp />,
    document.getElementById('root')
);