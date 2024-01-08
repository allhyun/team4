import React, { useEffect } from 'react';

const useOnClickOutside = (ref: any, handler: any) => {
  useEffect(() => {
    const listener = (event: any) => {
      // 모달 안 클릭 여부
      if (!ref.current) {
        return;
      }

      // 모달 밖 클릭 여부
      handler();
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
