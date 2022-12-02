import { useState } from 'react';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import '../../styles/HomePageFaq.css';
import faqData from './FaqData';

export default function Faqs() {
    const [isOpen, setIsOpen] = useState(null);
    const toggleOpen = (id) => () => setIsOpen((isOpen) => (isOpen === id ? null : id),);
  const [openAll, toggleOpenAll] = useState(false);

    return (
      <div>
        <div className="landing-page__faq--header">
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
        {faqData.map((item, index) => (
          <button
            className="faq"
            type="button"
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            onClick={toggleOpen(index)}
          >
            <div className="faq-text">
              <p className="faq-question__text">
                {item.question}
                {' '}
              </p>
              <span>
                {isOpen === index ? (
                  <BiMinusCircle
                    color="var(--l-primary-color)"
                    style={{ flexShrink: 0 }}
                  />
) : (
  <BiPlusCircle
    color="var(--l-primary-color)"
    style={{ flexShrink: 0 }}
  />
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
