import React from 'react'
import Dropdown from './Components/Dropdown'
import "./app.css"

import drc1 from "./img/drc_1.jpg"

function App() {
  return (
    <div className='content-body'>
      <Dropdown name='Name'>
        <p>Test</p>
        <p>More text</p>
        <img src={drc1} style={{height: '40vh'}}/>
      </Dropdown>
    </div>
  )
}

export default App;
