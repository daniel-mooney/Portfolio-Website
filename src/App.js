import React, { useEffect, useRef } from 'react';
import Dropdown from './Components/Dropdown';
import ContactForm from './Components/ContactForm';

import "./app.css";
import drc1 from "./img/drc_1.jpg"

function App() {
  const content = useRef(null);
  const background = useRef(null);
  let backgroundHeight = '100vh'
  
  useEffect(() => {
    const element = content.current;

    if (!element || !background) return;

    const observer = new ResizeObserver(() => {
      background.current.style.height = `${content.current.scrollHeight}px`;
    });

    observer.observe(element);
    return () => {
      // Cleanup the observer by unobserving all elements
      observer.disconnect();
    };
  }, [])
  
  return (
    <>
      
      <div className='parallax'>
        <div className='parallax__layer--back' ref={background}></div>
        <div className='parallax__layer--base content-body' ref={content}>
          <Dropdown name='Name'>
            <div style={{padding: '0.7rem'}}>
              <p>Test</p>   
            </div>
          </Dropdown>
          <Dropdown name="Image">
            <img src={drc1} style={{height: '40vh'}}/>
          </Dropdown>
          
          <ContactForm />
        </div>
      </div>
    </>
  )
}

export default App;
