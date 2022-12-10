import React from 'react';
import PropTypes from 'prop-types';
import { HashLink as Link } from 'react-router-hash-link';
import { RiHome6Line } from 'react-icons/ri';
import { BsBriefcase, BsQuestionCircle } from 'react-icons/bs';
import { BiInfoCircle } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import { useTranslation } from 'react-i18next';

export default function MobileHeaderToggle({ handleToggle, toggle }) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-full border-grey-200 lg:hidden">
      <button
        type="button"
        className="flex flex-col items-end justify-between w-5 h-4"
        onClick={() => handleToggle(true)}
      >
        <span
          className="w-full h-0.5 rounded-xl bg-gray-600"
        />
        <span
          className="w-full h-0.5  rounded-xl bg-gray-600"
        />
        <span
          className="w-full h-0.5 rounded-xl bg-gray-600"
        />
      </button>
      <MobileHeader isOpen={toggle} toggleNav={handleToggle} />
    </div>
  );
}

MobileHeaderToggle.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  toggle: PropTypes.bool.isRequired,
};

function MobileHeader({ isOpen, toggleNav }) {
  return (
    <div
      className="fixed right-0 top-0 bottom-0 z-20 w-3/4 transition-all duration-700 ease-in mobile-nav lg:hidden"
      style={isOpen ? undefined : { width: '0' }}
    >
      <Navigation
        handleClickProp={() => toggleNav(false)}
        style={
          isOpen
            ? { width: '100%', opacity: '1' }
            : { width: '0%', opacity: '0' }
        }
        itemStyle={
          isOpen
            ? { opacity: '1', height: '100%', display: 'flex' }
            : { opacity: '0', height: '0%', display: 'none' }
        }
      />
    </div>
  );
}

MobileHeader.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired,
};

function Navigation({ handleClickProp, style, itemStyle }) {
  const { t } = useTranslation(['common']);
  const links = [
    {
      name: `${t('home')}`,
      link: '/',
      icon: <RiHome6Line />,
    },
    {
      name: `${t('aboutus')}`,
      link: '/about-us',
      icon: <BsBriefcase />,
    },
    {
      name: `${t('contactus')}`,
      link: '/contact',
      icon: <BiInfoCircle />,
    },
    {
      name: `${t('faqs')}`,
      link: '/#faq',
      icon: <BsQuestionCircle />,
    },
  ];
  return (
    <div
      className="mobile-nav__items bg-white h-full transition-all ease-in duration-[600ms] p-4"
      style={style}
    >
      <button type="button" onClick={handleClickProp} className="flex justify-end text-2xl py-4 border-b border-gray-400 w-full" aria-label="close"><GrClose /></button>
      <menu
        className="flex flex-col mt-6 gap-6"
        style={itemStyle}
      >
        {links.map((link) => (
          <MenuItem
            path={link.link}
            pathName={link.name}
            icon={link.icon}
            handleClickProp={handleClickProp}
            key={link.link}
          />
        ))}
      </menu>
    </div>
  );
}

Navigation.propTypes = {
  handleClickProp: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.string).isRequired,
  itemStyle: PropTypes.objectOf(PropTypes.string).isRequired,
};

function MenuItem({
 pathName, path, icon, handleClickProp,
}) {
  return (
    <Link
      smooth
      to={path}
      className="rounded-lg p-2 mb-2 text-lg font-bold mobile-nav__item text-gray-600 flex items-center gap-4"
      onClick={handleClickProp}
    >
      <span>{icon}</span>
      <span>{pathName}</span>
    </Link>
  );
}

MenuItem.propTypes = {
  pathName: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  handleClickProp: PropTypes.func.isRequired,
};
