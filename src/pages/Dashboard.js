import React, { Component } from 'react'
import Prediction from './IncidentList'

export class Dashboard extends Component {

  render() {
    return (
      <div className='mainPannel' > 
        <Prediction/>
      </div>
    )
  }
}

export default Dashboard