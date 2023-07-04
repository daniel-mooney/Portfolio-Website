import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';

import "./contactForm.css"

const NAME_ID = "form-name";
const EMAIL_ID = "form-email";
const MSG_ID = "form-msg";

export default function ContactForm() {
    const form = useRef(null);
    const nameField = useRef(null);
    const emailField = useRef(null);
    const msgField = useRef(null);
    
    function emailForm(e) {
        e.preventDefault()
        console.log(nameField.current.value);
        console.log(emailField.current.value);
        console.log(msgField.current.value);
        
        emailjs.sendForm('service_empzo39', 'PFW_contact_form', form.current, 'SVWBkRhHG3q9jAL-l')
            .then(function(response) {
                alert("Message successfully sent!");
                clearForm();
            }, function(error) {
                alert("Message FAILED to send...")
            });
    }

    function clearForm() {
        nameField.current.value = null;
        emailField.current.value = null;
        msgField.current.value = null;
    }

    return (
    <>
        <form id='contact-form' ref={form} onSubmit={emailForm}>
            <div className='form-container'>
                <div className='contact-details-container'>
                    <input ref={nameField} type='text' placeholder='Name' name='name' size={23} required/>
                    <input ref={emailField}  type='email' placeholder='Email' name='email' size={42} required/>
                </div>
                <textarea ref={msgField} className='contact-msg' placeholder='Message' name='msg' rows='8' required/>
                <div className='contact-button-container'>
                    <button className='contact-button'>Send</button>
                </div>
            </div>
        </form>
    </>
    )
}
