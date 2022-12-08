import React, { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../../styles/Share.css';

export default function ShareMenu() {
   const [isCopied, setIsCopied] = useState(false);
   const btnRefLinkedin = useRef();
   const btnRefTwitter = useRef();
   const btnRefWhatsapp = useRef();
   const btnRefSlack = useRef();
   const btnRefFacebook = useRef();
   const btnRefMessenger = useRef();
   const btnRefInstagram = useRef();
   const postUrl = encodeURI(window.location.href);
   const postTitle = encodeURI('Hi everyone,Checkout the weather for today');
   const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
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
            useEffect(() => {
              btnRefFacebook.current.setAttribute(
                 'href',
                 `https://facebook.com/share?url=${postUrl}&text=${postTitle}`
               );
              });
              useEffect(() => {
                btnRefLinkedin.current.setAttribute(
                     'href',
                     `https://linkedin.com/share?url=${postUrl}&text=${postTitle}`
                   );
                  });
              useEffect(() => {
                btnRefInstagram.current.setAttribute(
                    'href',
                    `https://instagram.com/share?url=${postUrl}&text=${postTitle}`
                  );
                 });
                 useEffect(() => {
                  btnRefMessenger.current.setAttribute(
                       'href',
                       `https://messenger.com/share?url=${postUrl}&text=${postTitle}`
                     );
                    });
      return (
        <div className="share-button-cover">
          <div className="share-btn-container">
            <CopyToClipboard text={postUrl} onCopy={onCopyText}>
              <div className="copy-area">
                <img src="/share/share-link (1).png" alt="" className="twitter-btn" />
                <span className={`copy-feedback ${isCopied ? 'active' : ''}`}>Copied!</span>
              </div>
            </CopyToClipboard>
            <a href="https://tropicalweather.hng.tech" ref={btnRefTwitter} className="twitter-btn">
              <img src="/share/twitter-icon.png" alt="" className="share-tweet" />
            </a>
            <a href="https://tropicalweather.hng.tech" ref={btnRefWhatsapp} className="twitter-btn">
              <img src="/share/whatsapp-icon.png" alt="" className="share-tweet" />
            </a>
            <a href="https://tropicalweather.hng.tech" ref={btnRefSlack} className="twitter-btn1">
              <img src="/share/slack-icon.png" alt="" className="share-tweet" />
            </a>
          </div>
          <hr />
          <div className="share-btn-container1">
            <a href="https://tropicalweather.hng.tech" ref={btnRefMessenger} className="twitter-btn">
              <img src="/share/messager.png" alt="" className="share-tweet" />
            </a>
            <a href="https://tropicalweather.hng.tech" ref={btnRefFacebook} className="twitter-btn">
              <img src="/share/facebook (8).png" alt="" className="share-tweet" />
            </a>
            <a href="https://tropicalweather.hng.tech" ref={btnRefInstagram} className="twitter-btn">
              <img src="/share/instagram (1).png" alt="" className="share-tweet" />
            </a>
            <a href="https://tropicalweather.hng.tech" ref={btnRefLinkedin} className="twitter-btn1">
              <img src="/share/linkedin.png" alt="" className="share-tweet" />
            </a>
          </div>
        </div>
      );
   }
