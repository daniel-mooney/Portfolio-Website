import React from 'react';
import Dropdown from './Components/Dropdown';
import ContactForm from './Components/ContactForm';

import "./app.css";
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
        <img src={drc1} style={{height: '40vh'}}/>
      </Dropdown>
      <Dropdown name="Projects">
        <div style={{padding: '0.7rem'}}>
          <p>Some of my past projects</p>
          <ul>
            <li>This React website!</li>
            <li>Droid racing challenge</li>
          </ul>
        </div>
      </Dropdown>
      <br/>
      <h2>Contact Me</h2>
      <ContactForm />
    </div>
  )
}

export default App;
