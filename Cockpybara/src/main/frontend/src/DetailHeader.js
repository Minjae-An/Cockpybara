import React from 'react';
import NewMenu from './NewMenu';
import NewNavBar from './NewNavBar';
import HeaderSearch from './HeaderSearch';
import './DetailHeader.css';
import './MainHeader.css';

function DetailHeader() {

  return (
    <header className="header">
      <div className="button-container">
        <NewNavBar /> {/*햄버거 모양*/}
        <NewMenu /> {/*메뉴 4개*/}
        <HeaderSearch /> {/*검색 부분*/}
      </div>
    </header>
  );
};

export default DetailHeader;



