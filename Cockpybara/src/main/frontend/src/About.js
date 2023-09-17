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
                  안민재소개문구안민재소개문구안민재소개문구안민재소개문구안민재소개문구안민재소개문구안민재소개문구안민재소개문구안민재소개문구안민재소개문구
                </div>
              </div>
            </div>
            <div className="be-bottom">
              <div className="be-bottom-explan-box">
              <img src={uinon2}/>
                <div className="text-over-image">
                  김지수소개문구김지수소개문구김지수소개문구김지수소개문구김지수소개문구김지수소개문구김지수소개문구김지수소개문구김지수소개문구김지수소개문구
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
                  전소진소개문구전소진소개문구전소진소개문구전소진소개문구전소진소개문구전소진소개문구전소진소개문구전소진소개문구전소진소개문구전소진소개문구
                </div>
              </div>
            </div>
            <div className="fe-bottom">
              <div className="fe-bottom-explan-box">
              <img src={uinon2}/>
                <div className="text-over-image">
                  신승헤소개문구신승헤소개문구신승헤소개문구신승헤소개문구신승헤소개문구신승헤소개문구신승헤소개문구신승헤소개문구신승헤소개문구신승헤소개문구
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