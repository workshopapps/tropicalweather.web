import React from 'react';
import '../styles/culture.css';
import { Link } from 'react-router-dom';

export default function Culture() {
  return (
    <div className="body">
      <div className="head-img">
        <img src="assets/image/mo-woman.png" alt="logo" className="mo-wo" />
        <img src="assets/image/woman.png" alt="logo" className="woman" />
        <Link to="/careers" className="link link-hover">
          <div className="sub-back">
            <img src="assets/image/back.png" alt="back" />
            <p> Back to Careers</p>
          </div>
        </Link>
      </div>
      <div className="sub-content">
        <div className="cont-col1">
          <h2 className="midhead">Diversity, Equity and & Inclusion</h2>
          <p className="mid-p">The Global Office of Diversity,Equity and Inclusion office works cross-functionally with senior leaders,Human Resources, Business Relations and Councils to help create an inclusive environment.At The Weathery Company we focus on four strategic imperatives called CARE; create, articulate, regulate and evaluate.</p>
        </div>
        <div className="content-col2">
          <img src="assets/image/happy boy.png" alt="back" className="img2" />
        </div>
      </div>
      <div className="main-content">
        <div className="batch1">
          <div className="award">
            <img src="assets/image/scroll orange.png" alt="logo" className="scroll" />
            <h2 className="sub-award">Awards</h2>
          </div>
          <ul className="content-list">
            <li>Corperative Weather Observer Awards</li>
            <li>Coop Awards</li>
            <li>Weather and Meterological Awards</li>
            <li>National Weather Association Awards</li>
            <li>Weatherby Foundation</li>
          </ul>
        </div>
        <div className="batch2">
          <div className="comm">
            <img src="assets/image/scroll orange.png" alt="logo" className="scroll" />
            <h2 className="sub-comm">Commitments</h2>
          </div>
          <p className="comm-pa">The Company has joined the Valuable 500 with a commitment to putting disability inclusion on our business leadership agenda and establishing our global Ability & Wellness Inclusion framework.</p>
        </div>
        <div className="batch3">
          <div className="emp">
            <img src="assets/image/scroll orange.png" alt="logo" className="scroll" />
            <h2 className="sub-emp">Employee Groups</h2>
          </div>
          <p className="emp1-pa">
            <span className="culture_span">Inclusion Networks.</span>
            Inclusion Networks are an integral part of the diversity,
            equity and inclusion strategy for The Weathery Company.
            They are employee-led, company-recognized networks formed to act as a resource
            to both employees and the organization.They are regionally structured,
            globally connected groups of employees with common interests or
            backgrounds who wish to create a better shared future for people everywhere.
          </p>
          <p className="emp2-pa">
            <span className="culture_span">Business Forums.</span>
            Business forums provide networking volunteerism and professional development
            opportunities focused on specific industries/skillsets.
          </p>
        </div>
      </div>
    </div>
  );
}
