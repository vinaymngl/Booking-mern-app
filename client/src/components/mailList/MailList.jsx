import React from 'react';
import "./mailList.css";

const MailList = () => {
  return (
    <div className='mail'>
        <h1 className="mailTitle">
            save time, save money
        </h1>
        <span className="mailInputContainer">
            <input type= "text" placeholder = "Your Email"/>
            <button>Subscribe</button>
        </span>
      
    </div>
  )
}

export default MailList
