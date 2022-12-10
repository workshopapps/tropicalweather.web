import React, { useEffect, useState } from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

export default function ReactThemeToggleButton() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const body = document.querySelector('body');

    if (theme === 'dark') {
      body.className = 'dark';
      document.documentElement.style.colorScheme = 'dark';
      setTheme('dark');
    } else {
      body.className = '';
      document.documentElement.style.colorScheme = 'light';
      setTheme('light');
    }
  }, []);

  const toggleTheme = (theme) => {
    const body = document.querySelector('body');
    if (theme === 'dark') {
      body.className = 'dark';
      setTheme('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      body.className = '';
      document.documentElement.style.colorScheme = 'light';
      setTheme('light');
    }
    localStorage.setItem('theme', theme);
  };

  return (
    <span>
      {theme === 'light' ? (
        <button type="button" onClick={() => toggleTheme('dark')}>
          <BsFillMoonFill size={20} />
        </button>
      ) : (
        <button type="button" onClick={() => toggleTheme('light')}>
          <BsFillSunFill color="yellow" size={20} />
        </button>
      )}
    </span>
  );
}
