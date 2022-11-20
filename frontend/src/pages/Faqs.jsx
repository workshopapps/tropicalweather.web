import React, { useState } from "react";
import PlusIcon from "../FaqAssets/PlusIcon.svg";
import "../styles/Faqs.css";
import MinusIcon from "../FaqAssets/MinusIcon.svg";
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
        <h1>Frequently Asked Questions</h1>
        <h2>Everything you need to know about Weathery</h2>
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
              <h2 className="faq-question__text">{item.question}</h2>
              <span>
                {isOpen === index ? (
                  <img src={MinusIcon} alt="Minus icon" />
                ) : (
                  <img src={PlusIcon} alt="plus icon" />
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
              <img src={AppleIcon} alt="Apple icon" />
              {/* <div>
                  <p className="options-container__description">Get it on</p>
                  <p className="options-container__name">App Store</p>
                */}

              <img src={PlaystoreIcon} alt="Playstore icon" />
              {/* <div>
              <p className="options-container__description">Get it on</p>
              <p className="options-container__name">Play Store</p>
                */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
