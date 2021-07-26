import React from 'react'
import ReactDOM from 'react-dom'

import TimeApp from './context/TimeApp'
import TimeTrackerApp from './components/TimeTrackerApp'

ReactDOM.render(
  <TimeApp>
    <TimeTrackerApp />
  </TimeApp>,
  document.getElementById('root')
);
