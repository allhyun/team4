import React, { useEffect, useState } from 'react';
import '../../styles/style.scss';
import { log } from 'console';

const MainLogo = () => {
  let [msgIdx, setMsgIdx] = useState(0);
  let [arrIdx, setArrIdx] = useState(0);
  let msg = ['개발자의', '개발자에 의한', '개발자를 위한', 'Dev.join();'];

  const typing = function (txt: HTMLElement) {
    if (msgIdx < msg[arrIdx].length) {
      txt.innerText += msg[arrIdx][msgIdx];
      setMsgIdx(msgIdx + 1);
    } else {
      if (msg[arrIdx] === 'Dev.join();') return;
      setMsgIdx(0);
      setArrIdx(arrIdx + 1);
      txt.innerText = '';
    }
  };

  useEffect(() => {
    const txt: HTMLElement | null = document.getElementById('txt');
    let timeoutId: NodeJS.Timeout;
    if (txt !== null) {
      timeoutId = setTimeout(() => {
        typing(txt);
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [msgIdx]);

  return (
    <>
      <p className="main-logo" id="txt"></p>
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
