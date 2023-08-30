import React, { useRef } from 'react';
import './About.css'
import mainCopybara from "./photo/cock-circle.png";
import arrowButton from "./photo/arrow-bottom.png";

const About = () => {
  const introduceBoxRef = useRef(null);

  const handleScrollToIntroduction = () => {
    introduceBoxRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="about-box">
      <div className="main-box">
        <div className="main-contents">
          <div className="main-left">
            <div className="title-top">칵테일을<br /> 좋아하는<br /> 카피바라는<br /></div>
            <div className="title-bottom">
              칵테일을 어디든 자유로운 곳에서 쉽게 즐길 수 있도록<br />
              초보 홈 바텐더도 다양한 칵테일에 입문하고<br />
              커뮤니티 서비스를 통해 나만의 레시피를 소개할 수 있습니다.
            </div>
          </div>
          <div className="main-right">
            <img src={mainCopybara} alt="카피바라" ></img>
          </div>
        </div>
        <div className="arrow-button">
          <button>
            <img src={arrowButton} alt="버튼"></img>
          </button>
        </div>
      </div>

      <div className="introduce-box" ref={introduceBoxRef}>
        <div className="introduce-sub-box">
          <div className="be-box">
            <div className="be-logo">
              BE
            </div>
            <div className="be-top">
              ㅇ
            </div>
            <div className="be-bottom">
              ㅇ
            </div>
          </div>
          <div className="fe-box">
            <div className="fe-logo">
              FE
            </div>
            <div className="fe-top">
              ㅇ
            </div>
            <div className="fe-bottom">
              ㅇ
            </div>
          </div>
          <div className="design-box">
            <div className="design-logo">
              DESIGN
            </div>
            <div children="design-top">
              o
            </div>
            <div className="design-bottom">
              o
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;