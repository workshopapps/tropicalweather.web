import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/ContactUs.css';
import { BiPhoneCall } from 'react-icons/bi';
import { GoLocation } from 'react-icons/go';
import { TiSocialTwitterCircular } from 'react-icons/ti';
import { FaInstagram } from 'react-icons/fa';
import { RiFacebookCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { AiFillCheckCircle } from 'react-icons/ai';

export default function ContactUs() {
  const { t } = useTranslation(['contact']);
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast(true);
    e.target.reset();
    setTimeout(() => {
      setToast(false);
      navigate('/contact');
    }, 3000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="relative contact_us_container">
      <div className="contact_us_header">
        <h2 className="text-center">{t('getintouch')}</h2>
        <p>{t('askusanything')}</p>
      </div>
      <div className="cu_split">
        <div className="contact_us_instant_chat">
          <div className="contact_us_instant_img">
            <img className="cu_img_1" src="contact-us.png" alt="img" />
            <img className="cu_img_2" src="other-img.png" alt="img" />
          </div>
          <div className="cu_phone_address">
            <div className="contact_us_instant_chat">
              <h3>{t('instantchat')}</h3>
              <div className="contact_us_instant_chat_tag">
                <a
                  href="https://twitter.com/home"
                  target="_blank"
                  rel="noreferrer"
                >
                  <TiSocialTwitterCircular className="cu_icons" />
                  <p>
                    {t('twitter')}
                    {t('address')}
                  </p>
                </a>
              </div>
              <div className="contact_us_instant_chat_tag">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram className="cu_icons" />
                  <p>
                    {t('ig')}
                    {t('address')}
                  </p>
                </a>
              </div>
              <div className="contact_us_instant_chat_tag">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <RiFacebookCircleLine className="cu_icons" />
                  <p>
                    {t('fb')}
                    {t('address')}
                  </p>
                </a>
              </div>
            </div>
            <div className="contact_us_instant_chat">
              <h3>{t('phoneno')}</h3>
              <div className="contact_us_instant_chat_tag">
                <a href="tel:1223444404">
                  <BiPhoneCall className="cu_icons" />
                  <p>{t('phoneno')}</p>
                </a>
              </div>
            </div>
            <div className="contact_us_instant_chat">
              <h3>{t('address')}</h3>
              <div className="contact_us_instant_chat_tag">
                <a
                  href="https://goo.gl/maps/gwv2srmr8NBk2zct8"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GoLocation className="cu_icons" />
                  <p>
                    {t('office')}
                    {t('address')}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="cu_form">
          <div className="cu_form_t">
            <h2>{t('sendusmessage')}</h2>
            <form className="cu_form_sub" action="" onSubmit={handleSubmit}>
              <label htmlFor="name">{t('yourname')}</label>
              <br />
              <input className="cu_input" type="text" placeholder="Doe Mavis" />
              <br />
              <label htmlFor="email">{t('youremail')}</label>
              <br />
              <input
                className="cu_input"
                type="email"
                placeholder="DoeMavis@gmail.com"
              />
              <br />
              <label htmlFor="textarea">{t('yourmessage')}</label>
              <br />
              <textarea
                className="cu_input"
                name="textarea"
                id="textarea"
                cols="30"
                rows="10"
                placeholder={`${t('yourmessage')} ${t('here')}`}
              />
              <br />
              <div className="cu_button">
                <button className="cu_button_" type="submit">
                  {t('send')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {toast ? (
        <div
          className="absolute flex items-center gap-2 p-1 bg-gray-200 rounded-lg"
          style={{
            left: '50%',
            bottom: '1.5%',
            transform: 'translateX(-50%)',
            padding: '10px',
            width: 'fit-content',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #054F39',
          }}
        >
          <AiFillCheckCircle color="#054F39" />
          <p style={{ fontSize: '16px' }}>{t('messagehasbeensent')}</p>
        </div>
      ) : null}
    </div>
  );
}
