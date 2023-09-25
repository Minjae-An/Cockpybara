import React, { useRef } from 'react';
import './About.css'
import mainCopybara from "./photo/cock-circle.png";
import arrowButton from "./photo/arrow-bottom.png";
import mj from "./photo/mj.png"
import js from "./photo/js.png"
import sj from "./photo/sj.png"
import sh from "./photo/sh.png"
import uinon from "./photo/Union.png"
import uinon2 from "./photo/Union2.png"

const About = () => {
  const introduceBoxRef = useRef(null);

  const handleScrollToIntroduction = () => {
    introduceBoxRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const handleImageClick = () => {
    // "/"로 이동하려면 다음과 같이 사용할 수 있습니다.
    window.location.href = '/';

    // 이전 페이지로 이동하려면 다음과 같이 사용할 수 있습니다.
    //window.history.back();
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
              <img
                  src={mainCopybara}
                  alt="카피바라"
                  onClick={handleImageClick}
              ></img>
            </div>
          </div>
          <div className="arrow-button">
            <button onClick={handleScrollToIntroduction}>
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
                <div className="be-top-img-box">
                  <img src={mj}/>
                </div>
                <div className="be-top-explan-box">
                  <img src={uinon}/>
                  <div className="text-over-image">
                    안정성과 확장성을 고려하여 스프링부트를 기반으로 개발하여 사용자들에게 항상 높은 성능과 무결성을 제공합니다
                  </div>
                </div>
              </div>
              <div className="be-bottom">
                <div className="be-bottom-explan-box">
                  <img src={uinon2}/>
                  <div className="text-over-image">
                    AWS S3와 마리아 DB를 적절하게 사용하여 이미지 저장을 효율적으로 하고, 레시피 관련된 정보를 신속하게 찾도록 구성했습니다
                  </div>
                </div>
                <div className="be-bottom-img-box">
                  <img src={js}/>
                </div>
              </div>
            </div>
            <div className="fe-box">
              <div className="fe-logo">
                FE
              </div>
              <div className="fe-top">
                <div className="fe-top-img-box">
                  <img src={sj}/>
                </div>
                <div className="fe-top-explan-box">
                  <img src={uinon}/>
                  <div className="text-over-image">
                    리액트를 사용하여 사용자 친화적이고 직관적인 사용자 인터페이스를 제공하며, 레시피 월간순위 및 최근순위 등의 커뮤니티 기능을 구현했습니다
                  </div>
                </div>
              </div>
              <div className="fe-bottom">
                <div className="fe-bottom-explan-box">
                  <img src={uinon2}/>
                  <div className="text-over-image">
                    내 마이페이지를 통해 사용자가 등록한 레시피와 즐겨찾기한 레시피를 편리하게 관리할 수 있도록 기능을 제공하며, 사용자 경험을 최적화했습니다
                  </div>
                </div>
                <div className="fe-bottom-img-box">
                  <img src={sh}/>
                </div>
              </div>
            </div>
            {/* <div className="design-box">
            <div className="design-logo">
              DESIGN
            </div>
            <div children="design-top">
              <div className="design-top-img-box">

              </div>
              <div className="design-top-explan-box">

              </div>
            </div>
            <div className="design-bottom">
              <div className="design-bottom-img-box">

              </div>
              <div className="design-bottom-explan-box">

              </div>
            </div>
          </div> */}
          </div>
        </div>
      </div>
  );
};

export default About;