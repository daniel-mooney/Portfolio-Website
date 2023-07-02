import React from 'react'
import Dropdown from './Components/Dropdown'
import "./app.css"

import drc1 from "./img/drc_1.jpg"

function App() {
  return (
    <div className='content-body'>
      <Dropdown name='Name'>
        <div style={{padding: '0.7rem'}}>
          <p>Test</p>   
        </div>
      </Dropdown>
      <Dropdown name="Image">
        <div style={{padding: '0.7rem'}}>
          <img src={drc1} style={{height: '40vh'}}/>
        </div>
      </Dropdown>
    </div>
  )
}

export default App;
