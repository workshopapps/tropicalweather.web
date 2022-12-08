import React, { useEffect, useRef } from 'react';
import '../../styles/Share.css';

export default function ShareMenu() {
  const btnRefLinkedin = useRef();
  const btnRefTwitter = useRef();
  const btnRefWhatsapp = useRef();
  const btnRefSlack = useRef();
  const btnRefMore = useRef();
  const postUrl = encodeURI(window.location.href);
  const postTitle = encodeURI('Hi everyone,Checkout the weather for today');
  useEffect(() => {
    btnRefTwitter.current.setAttribute(
      'href',
      `https://twitter.com/share?url=${postUrl}&text=${postTitle}`
    );
  });
  useEffect(() => {
    btnRefWhatsapp.current.setAttribute(
      'href',
      `https://whatsapp.com/share?url=${postUrl}&text=${postTitle}`
    );
  });
  useEffect(() => {
    btnRefSlack.current.setAttribute(
      'href',
      `https://slack.com/share?url=${postUrl}&text=${postTitle}`
    );
  });
  return (
    <div className="share-button-cover">
      <div className="share-btn-container">
        <a href="https://tropicalweather.hng.tech" ref={btnRefLinkedin} className="twitter-btn">
          <img src="/share/share-link (1).png" alt="" className="share-tweet" />
        </a>
        <a href="https://tropicalweather.hng.tech" ref={btnRefTwitter} className="twitter-btn">
          <img src="/share/twitter-icon.png" alt="" className="share-tweet" />
        </a>
        <a href="https://tropicalweather.hng.tech" ref={btnRefWhatsapp} className="twitter-btn">
          <img src="/share/whatsapp-icon.png" alt="" className="share-tweet" />
        </a>
        <a href="https://tropicalweather.hng.tech" ref={btnRefSlack} className="twitter-btn">
          <img src="/share/slack-icon.png" alt="" className="share-tweet" />
        </a>
        <a href="https://tropicalweather.hng.tech" ref={btnRefMore} className="twitter-btn1">
          <img src="/share/more-icon (1).png" alt="" className="share-tweet" />
        </a>
      </div>
    </div>
  );
}
