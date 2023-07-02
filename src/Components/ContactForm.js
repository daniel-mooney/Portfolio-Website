import React, { useRef } from 'react'
import "./contactForm.css"

const NAME_ID = "form-name";
const EMAIL_ID = "form-email";
const MSG_ID = "form-msg";

export default function ContactForm() {

    const nameField = useRef(null);
    const emailField = useRef(null);
    const msgField = useRef(null);
    
    function submitForm(e) {
        e.preventDefault()
        console.log(nameField.current.value);
        console.log(emailField.current.value);
        console.log(msgField.current.value);

        clearForm();
    }

    function clearForm() {
        nameField.current.value = null;
        emailField.current.value = null;
        msgField.current.value = null;
    }

    return (
    <>
        <form onSubmit={submitForm}>
            <div className='form-container'>
                <div className='contact-details-container'>
                    <input ref={nameField} className='contact-name' type='text' placeholder='Name'/>
                    <input ref={emailField} className='contact-email' type='email' placeholder='Email'/>
                </div>
                <textarea ref={msgField} className='contact-msg' placeholder='Message' rows='8'/>
                <div className='contact-button-container'>
                    <button className='contact-button'>Send</button>
                </div>
            </div>
        </form>
    </>
    )
}
