import React from 'react';
import './MainMain.css';
import Cock1 from "./photo/Cock1.png";


const MainMain = () => {
    return (
        <div className="Cock1"> {/*컴포넌트로?!*/}
            <img src={Cock1} />
            <div className="Cock1-text-box">
                <div className="Cock1-title" style={{ fontFamily: 'Poller One, sans-serif' }}>
                    Daiquiri
                </div>
                <div className="Cock1-contents">
                    라임 주스와 바카디 럼으로 만들어진 칵테일의 비밀.
                    <br></br>
                    세계적인 작가 어니스트 헤밍웨이가 사랑한 2가지의 칵테일로 알려져 있다.
                </div>
                <div className="go-button">

                </div>
            </div>
        </div>
    );
};

export default MainMain;
