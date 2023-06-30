import React from 'react'
import "./dropdown.css"

export default function Dropdown({name}) {
  return (
    <div className='tab'>
        <h2 style={{margin: '0'}}>{name}</h2>
        <button className='drop-button'>+</button>
    </div>
    // {this.props.children}
  )
}
