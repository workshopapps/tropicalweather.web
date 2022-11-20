import React from 'react';
import Features01 from '../components/Features/Features01';
import BoxMage from '../components/Features/BoxMage';
import Features02 from '../components/Features/Features02';
import BoxMage1 from '../components/Features/BoxMage1';
import BoxMage2 from '../components/Features/BoxMage2';
import Frequently from '../components/Features/Frequently';
import Frame from '../components/Features/Frame';
import Hero from '../components/Features/Hero';
import '../styles/Features.css';

export default function Features() {
  return (
    <div>
      <Hero />
      <Features01 />
      <BoxMage />
      <Features02 />
      <BoxMage1 />
      <BoxMage2 />
      <Frequently />
      <Frame />
    </div>
  );
}
