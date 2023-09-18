import React from 'react';
import MyCommunitySection from './MyCommunitySection';
import MonthlyPopularSection from './MonthlyPopularSection';
import CocktailListSection from './CocktailListSection';
import DetailHeader from './DetailHeader';
import './Community.css'

function Community() {
  const userId = 'user123'; // 여기에 실제 유저 아이디를 가져와서 사용하도록 변경해야 합니다.

  return (
    <div>
      <DetailHeader/>
        <div className="ruru">
          <div className="community-box">
            <div className="left-contents ">
              <MyCommunitySection />
              <MonthlyPopularSection />
            </div>
            <div className="right-contents">
              <CocktailListSection />
            </div>
          </div>
        </div>
    </div>
  );
};

export default Community;


