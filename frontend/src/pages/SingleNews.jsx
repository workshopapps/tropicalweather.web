import React from 'react';
import Hero from '../components/SingleNews/Hero';
import Maine from '../components/SingleNews/Maine';
import '../styles/SingleNews.css';

export default function SingleNews() {
  return (
    <div className="home">
      <Hero />
      <Maine />
    </div>
  );
}
