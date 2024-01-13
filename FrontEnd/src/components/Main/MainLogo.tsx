import React from 'react';
import '../../styles/style.scss';

const MainLogo = () => {
  return (
    <>
      <p className="main-logo">dev.join()</p>
      <div className="g-container">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </>
  );
};

export default MainLogo;
