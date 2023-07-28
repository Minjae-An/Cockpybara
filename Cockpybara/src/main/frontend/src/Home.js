import React from 'react';
import './Home.css';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import MainMain from './MainMain';

function Home() {
  return (
    <div>
      <MainHeader />
      <MainMain/>
      <MainFooter />
    </div>
  );
}

export default Home;