import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { IoCheckmark } from 'react-icons/io5';

interface Props {
  msg: string;
  setIsModalOpen: Function;
}

const Modal = ({ msg, setIsModalOpen }: Props) => {
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
          <IoAlertCircleOutline />

          {msg}
        </div>
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
};

export default Modal;
