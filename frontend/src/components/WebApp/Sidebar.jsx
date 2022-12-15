import React from 'react';
import { RxBookmark } from 'react-icons/rx';
import { VscBellDot, VscSettingsGear, VscHome } from 'react-icons/vsc';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="flex-col items-center hidden w-20 h-screen gap-10 py-4 text-gray-400 border-r lg:flex">
      <>
        <NavLink
          to="/app/dashboard"
          aria-label="Home"
        >
          <VscHome className="text-3xl" />
        </NavLink>
        <NavLink
          to="/app/saved-locations"
          aria-label="Saved locations"
        >
          <RxBookmark className="text-3xl" />
        </NavLink>
        <NavLink
          to="/app/notification-feeds"
          aria-label="Notification feeds"
        >
          <VscBellDot className="text-3xl" />
        </NavLink>
        <NavLink
          to="/app/settings"
          aria-label="Settings"
        >
          <VscSettingsGear className="text-3xl" />
        </NavLink>
      </>
    </aside>
  );
}
