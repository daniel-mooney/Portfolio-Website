import React from 'react'
import "./contactForm.css"

export default function ContactForm() {
  return (
    <>
        <form>
            <div className='form-container'>
                <div className='contact-details-container'>
                    <input className='contact-name' type='text' placeholder='Name'/>
                    <input className='contact-email' type='email' placeholder='Email'/>
                </div>
                {/* <input className='contact-msg' type='text' placeholder='Message'/> */}
                <textarea className='contact-msg' placeholder='Message' rows='8'/>
                <div className='contact-button-container'>
                    <button className='contact-button'>Send</button>
                </div>
            </div>
        </form>
    </>
  )
}
