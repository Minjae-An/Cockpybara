import React from 'react';
import MyCommunitySection from './MyCommunitySection';
import MonthlyPopularSection from './MonthlyPopularSection';
import CocktailListSection from './CocktailListSection';

function Community() {
  const userId = 'user123'; // 여기에 실제 유저 아이디를 가져와서 사용하도록 변경해야 합니다.

  return (
    <div>
      <MyCommunitySection />
      <MonthlyPopularSection />
      <CocktailListSection />
    </div>
  );
};

export default Community;



