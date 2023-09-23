import React, { useState } from 'react';
import MyCommunitySection from './MyCommunitySection';
import MonthlyPopularSection from './MonthlyPopularSection';
import CocktailListSection from './CocktailListSection';
import DetailHeader from './DetailHeader';
import './Community.css';

function Community() {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsHeaderFixed(true);
    } else {
      setIsHeaderFixed(false);
    }
  };

  window.addEventListener('scroll', handleScroll);

  const userId = 'user123'; // Replace with actual user ID

  return (
    <div>
      <div className="ruru">
        <div className="community-box">
          <div className="left-contents">
            <MyCommunitySection />
            <MonthlyPopularSection />
          </div>
          <div className="right-contents">
            <CocktailListSection />
          </div>
        </div>
      </div>
        <DetailHeader />
    </div>
  );
}

export default Community;
