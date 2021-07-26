import Header from './Header'
import Tasks from './Tasks'
import AddTask from './AddTask'

const TimeTrackerApp = () => {

  // TODOs
  // - Make a reset button
  // - Style the app
  // - Make a Header to use routing
  // - Make a Visual track like google calendar

  return (
    <div>
      <Header />
      <Tasks />
      <AddTask />
    </div>
  )
}

export default TimeTrackerApp