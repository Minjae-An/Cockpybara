import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Error.css';

const Error = () => {
    const navigate = useNavigate();

    const handleErrorButtoClick = () => {
        navigate('/');
    }

    return (
        <div>
            <div class='container'>
            <svg
            class="polygon-3"
            width="198"
            height="198"
            viewBox="0 0 198 198"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                d="M94.6699 7.49999C96.5944 4.16666 101.406 4.16667 103.33 7.5L180.406 141C182.331 144.333 179.925 148.5 176.076 148.5H21.9237C18.0747 148.5 15.6691 144.333 17.5936 141L94.6699 7.49999Z"
                fill="black"
            />
            </svg>
        
            <div class="error">!</div>
            <div class="errorTitle">일시적인 오류가 발생하였습니다.</div>
            <div class="errorText">
            죄송합니다. 이 페이지를 사용할 수 없습니다.
            <br />
            다른 방법으로 다시 접속해주세요.
            </div>
            <div class="backhome">
            <button class="homebutton" onClick={handleErrorButtoClick}>홈으로</button>
            </div>
            </div>
      </div>
      
    );
};

export default Error;