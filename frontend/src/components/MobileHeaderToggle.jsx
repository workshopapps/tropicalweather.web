import React from 'react';
import PropTypes from 'prop-types';
import { HashLink as Link } from 'react-router-hash-link';
import { RiHome6Line } from 'react-icons/ri';
import { BsBriefcase } from 'react-icons/bs';
import { BiInfoCircle } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import { useTranslation } from 'react-i18next';
import { VscBellDot, VscHome, VscSettingsGear } from 'react-icons/vsc';
import { RxBookmark } from 'react-icons/rx';
import { useLocation } from 'react-router-dom';

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
      className="fixed top-0 bottom-0 right-0 z-20 w-3/4 transition-all duration-700 ease-in mobile-nav lg:hidden"
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
  const { pathname } = useLocation();
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
  ];
  const appLinks = [
    {
      name: `${t('home')}`,
      link: '/app/dashboard',
      icon: <VscHome />,
    },
    {
      name: `${t('savedlocations')}`,
      link: '/app/saved-locations',
      icon: <RxBookmark />,
    },
    {
      name: `${t('notificationfeeds')}`,
      link: '/app/notification-feeds',
      icon: <VscBellDot />,
    },
    {
      name: `${t('settings')}`,
      link: '/app/settings',
      icon: <VscSettingsGear />,
    },
  ];

  const linksToUse = pathname.includes('app') ? appLinks : links;
  return (
    <div
      className="mobile-nav__items bg-white h-full transition-all ease-in duration-[600ms] p-4"
      style={style}
    >
      <button type="button" onClick={handleClickProp} className="flex justify-end w-full py-4 text-2xl border-b border-gray-400" aria-label="close"><GrClose /></button>
      <menu
        className="flex flex-col gap-6 mt-6"
        style={itemStyle}
      >
        {linksToUse.map((link) => (
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
      className="flex items-center gap-4 p-2 mb-2 text-lg font-bold text-gray-600 rounded-lg mobile-nav__item"
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
