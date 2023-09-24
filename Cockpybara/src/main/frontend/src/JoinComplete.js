import React from 'react';
import './JoinComplete.css';
import image1 from './photo/capybaraIcon.png';
import capybaraJoin from './photo/JoinComplete.png';

const JoinComplete = () => {
  return (
    <div className="joinComplete-box">
      <div className="joinComplete-title">
        Capybara
      </div>
      <div className="joinComplete-main">
        <div className="joinComplete-main-contents">
          <div className="joinComplete-main-message">
            이름받아와야함 님,<br /> 가입을 축하합니다.
          </div>
          <div className="joinComplete-main-login-btn">
            <button>
              로그인하기
            </button>
          </div>
        </div>
        <div className="joinComplete-image">
          <img src={capybaraJoin} alt="Capybara Join" />
        </div>
      </div>
    </div>
  );
};

export default JoinComplete;
