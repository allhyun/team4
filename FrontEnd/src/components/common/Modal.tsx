import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { GoCheck } from 'react-icons/go';

interface Props {
  state?: string;
  msg: string;
  setIsModalOpen: Function;
}

const Modal = ({ state = 'alert', msg, setIsModalOpen }: Props) => {
  useEffect(() => {
    const timeoutId: any = () => setTimeout(() => setIsModalOpen(false), 3000);
    timeoutId();
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className="modal-wrap">
        <div className="modal">
          {state === 'sucess' && <GoCheck />}
          {state === 'alert' && <IoAlertCircleOutline />}
          {msg}
        </div>
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
};

export default Modal;
