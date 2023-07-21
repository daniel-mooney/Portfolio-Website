import React, { useEffect, useRef } from 'react';
import Dropdown from './Components/Dropdown';
import ContactForm from './Components/ContactForm';

import "./app.css";
import drc1 from "./img/drc_1.jpg"
import Competencies from './Components/Competencies';

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
          <Competencies width={650} height={350}/>
          <div className='dropdown-wrapper'> 
            <Dropdown name='Lorem Ipsum'>
              <div className='dropdown-content'>
                <img className='dropdown-img' src={drc1} style={{height: '35vh'}}/>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a posuere leo.
                  Mauris suscipit laoreet orci id porta. Phasellus maximus at nunc id cursus.
                  Quisque condimentum eros libero, ac fringilla ex commodo a. 
                  Quisque rutrum tempor sagittis. Ut quis dapibus sapien, eu varius justo.
                  Quisque vitae lacus eget eros blandit tristique. Praesent mollis neque non nisl 
                  blandit malesuada. Phasellus sit amet semper nisi. Cras vel scelerisque nisl.
                  Aliquam feugiat cursus sapien, sed tempor velit aliquet sed.
                  Vestibulum eu lorem porta, scelerisque felis nec, scelerisque quam.
                  Etiam malesuada, diam ac gravida euismod, quam leo imperdiet mi, id blandit 
                  quam sapien eget lacus.
                </p>
              </div>
            </Dropdown>
            <Dropdown name="Image">
              <img src={drc1} style={{height: '40vh'}}/>
            </Dropdown>
          </div>
          <br/>
          <ContactForm />
        </div>
      </div>
    </>
  )
}

export default App;
