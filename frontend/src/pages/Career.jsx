import React from 'react';
import Article from '../components/Careers/Article';
import Department from '../components/Careers/Department';
import Interns from '../components/Careers/Interns';
import '../styles/Career.css';

export default function Career() {
  const aboutCompany = 'About the Company';
  const position = 'left';
  const aboutContent =
    'With about 1,500 staffs we are committed to ensuring the weather  forecasts are correct and apt, so we never leave you wanting';
  const aboutSrc = './assets/careers/Rectangle 42.png';
  const careerCompany = 'Career Opportunities';
  const careerContent =
    ' Explore our open roles for working totally remote, from the office or somewhere in between';
  const careerSrc = './assets/careers/Rectangle 43.png';
  return (
    <div>
      <div className="career_hero" />
      <div className="career_container">
        <div className="career_introtext">
          <h1 className="career_heading">
            At Weathery, we do not only bring you real-time and accurate weather
            updates, we also strive to be creative, innovative and
            growth-oriented.
          </h1>
          <p className="career_subheading">
            Together, we are learning and growing, building on our iconic past
            to make an Impact
          </p>
        </div>
        <div>
          <Article
            heading={aboutCompany}
            content={aboutContent}
            imageSrc={aboutSrc}
          />
          <Article
            heading={careerCompany}
            content={careerContent}
            imageSrc={careerSrc}
            position={position}
          />
        </div>
        <div className="career_oport career_sec">
          <h3 className="career_opp">Career Oportunities</h3>
          <p>
            Explore our open roles for working totally remote, from the office
            or somewhere in between
          </p>
          <button className="career_filter" type="button">
            filter jobs listings
          </button>

          <input
            type="text"
            placeholder="Search           |  all locations Departments, All jobs types"
            className="career_findjob"
          />
        </div>

        <div className="career_list career_sec">
          <Department department="Products and technology" />
          <Interns
            position="Director of Data Science, Expansion"
            location="Toronto - Remote"
          />
          <Interns
            position="Principal Product Designer, Network- Weathery"
            location="3 locations"
          />
          <Interns
            position="Senior Engineering Manager, CSC"
            location="5 locations"
          />
          <Interns
            position="Software Engineer II, Andriod - Weatherby"
            location="California - Remote"
          />
          <Interns
            position="Senior Software Engineer, IOS Application infrastucture"
            location="3 Location"
          />
          <Interns
            position="Senior Engineer Manager, Enterprise"
            location="2 Location"
          />
          <Interns
            position="Sr, Software Engineer, Tools and Delivery"
            location="3 Location"
          />
        </div>
        <div className="internship career_sec">
          <Department department="Internship" />
          <Interns
            position="2023 Summer Intern Software Engineer [Weathery]"
            location="California - San Fransisco"
          />
          <Interns
            position="2023 Summer Intern Software Product Design [Weathery]"
            location="6 locations"
          />
          <Interns
            position="Survey Research Doctoral Internship"
            location="7 locations"
          />
          <Interns
            position="User Research Doctoral Internship"
            location="7 locations"
          />
        </div>
        <div className="sales career_sec">
          <Department department="Sales" />
          <Interns
            position="Account Executive - Comms, Media & Tech"
            location="New York - New York"
          />
          <Interns
            position="Account Executive, Enterprise - Financial Services"
            location="8 locations"
          />
          <Interns
            position="Account Executive, Enterprise - Financial Services"
            location="Germany"
          />
          <Interns
            position="Account Executive, Enterprise - Financial Services"
            location="New York"
          />
          <Interns
            position="Account Executive, Enterprise - Financial Services"
            location="California - San Fransisco"
          />
        </div>
      </div>
    </div>
  );
}
