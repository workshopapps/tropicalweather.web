import React, { useState } from "react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import "../styles/Faqs.css";
import PlaystoreIcon from "../FaqAssets/google-play.png";
import AppleIcon from "../FaqAssets/app-store.png";
import ArrowDown from "../FaqAssets/ArrowDownBtn.svg";
import SearchBtn from "../FaqAssets/SearchBtn.svg";
import CustomercareAvatar from "../FaqAssets/AvatarGroup.png";
import faqsData from "../components/FaqsData";

export default function Faqs() {
  const [isOpen, setIsOpen] = useState(null);
  const toggleOpen = (id) => () =>
    setIsOpen((isOpen) => (isOpen === id ? null : id));
  return (
    <div className="faq-container">
      <header className="faq-header">
        <p className="faq-header__title">Frequently Asked Questions</p>
        <p className="faq-header__description">
          Everything you need to know about Weathery
        </p>
        <div className="faq-search">
          <div className="test">
            <div className="faq-search-bar">
              <img
                src={SearchBtn}
                alt="Search button"
                className="faq-header__icon"
              />
              <input type="search" placeholder="Search" />
            </div>

            <div className="faq-search-btn">
              <img
                src={ArrowDown}
                alt="arrow down button"
                className="faq-header__arrowdown--icon"
              />
              <button className="faq-search-cta-btn" type="button">
                Search
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="faqs">
        {faqsData.map((item, index) => (
          <button
            className="faq"
            type="button"
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            onClick={toggleOpen(index)}
          >
            <div className="faq-text">
              <p className="faq-question__text">{item.question}</p>
              <span>
                {isOpen === index ? (
                  <FiMinusCircle className="toggle-icon" />
                ) : (
                  <FiPlusCircle className="toggle-icon" />
                )}
              </span>
            </div>
            {isOpen === index ? (
              <p className="faq-answer__text">{item.answer}</p>
            ) : null}
          </button>
        ))}
        <section className="faqs__customer--line">
          <img src={CustomercareAvatar} alt="Customer care Avatar" />
          <h3 className="faqs__customer--line--heading">
            Still have questions?
          </h3>
          <p className="faqs__customer--line--supporting-text">
            Cant find the answers you looking for? Please chat to our friendly
            team
          </p>
          <button className="faqs__customer--line--btn" type="button">
            Contact us
          </button>
        </section>

        <section className="faqs__mobile--app">
          <div className="faqs__mobile--app--text-container">
            <p className="faqs__mobile--app--heading">Go Mobile</p>
            <p className="faqs__mobile--app--sub-heading-text">
              Use the free Weathery app
            </p>
            <p className="faqs__mobile--app--heading--description">
              Explore the flexibility that comes with using our Weatherly app on
              the go!
            </p>
            <div className="options-container">
              <img src={AppleIcon} className="apple-icon" alt="Apple icon" />
              <img
                src={PlaystoreIcon}
                className="playstore-icon"
                alt="Playstore icon"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
