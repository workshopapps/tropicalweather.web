import { useState } from 'react';
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import "../../styles/Home-Faq.css";
import faqsData from "./FaqData";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';


export default function Faqs() {
  const [isOpen, setIsOpen] = useState(null);
  const toggleOpen = (id) => () =>
    setIsOpen((isOpen) => (isOpen === id ? null : id));
  const [openAll, toggleOpenAll] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="landing_header_md">Explore FAQs</h3>
        <button
          type="button"
          className="flex items-center gap-2 text-[#565560]"
          onClick={() => toggleOpenAll((prv) => !prv)}
        >
          View full
          {openAll ? <FaAngleUp /> : <FaAngleDown />}
        </button>
      </div>
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
    </div>
  );
}
