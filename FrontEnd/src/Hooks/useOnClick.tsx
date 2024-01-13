import React, { useEffect } from 'react';

const useOnClick = (handler: Function) => {
  useEffect(() => {
    const listener = (event: any) => {
      handler();
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [handler]);
};

export default useOnClick;
