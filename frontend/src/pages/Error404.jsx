import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Error404.css';

export default function Error404() {
    return (
      <div className="error-container">
        <div className="error-col1">
          <h1 className="error-head">Something went wrong!</h1>
          <p className="error-para">This is awkward! Our site is under the weather or you are lost in the clouds. Either way, our site is still a delightful means for weather forecast.</p>
          <div className="error-buttons">
            <Link to="/" className="Error-button">Go Back To Home Page</Link>
          </div>
        </div>
        <div className="error-col2">
          <img src="/Error404/illustration.png" alt="oops!!Error" className="Error-ill" />
          <img src="/Error404/illustration (2).png" alt="oops!!Error" className="Error-ill2" />
          <p className="error-para2">This is awkward! Our site is under the weather or you are lost in the clouds. Either way, our site is still a delightful means for weather forecast.</p>
          <div className="error-buttons2">
            <Link to="/" className="Error-button">Go Back To Home Page</Link>
          </div>
        </div>
      </div>
    );
    }
