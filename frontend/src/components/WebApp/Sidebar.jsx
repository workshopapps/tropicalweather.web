import React from 'react';
import { RxBookmark } from 'react-icons/rx';
import { VscBellDot, VscSettingsGear, VscHome } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="flex-col items-center hidden w-20 h-screen gap-10 py-4 text-gray-400 border-r lg:flex">
      <>
        <Link
          to="/"
          aria-label="Home"
        >
          <VscHome className="text-3xl" />
        </Link>
        <Link
          to="/app/saved-locations"
          aria-label="Saved locations"
        >
          <RxBookmark className="text-3xl" />
        </Link>
        <Link
          to="/notification-feeds"
          aria-label="Notification feeds"
        >
          <VscBellDot className="text-3xl" />
        </Link>
        <Link
          to="/settings"
          aria-label="Settings"
        >
          <VscSettingsGear className="text-3xl" />
        </Link>
      </>
    </aside>
  );
}
