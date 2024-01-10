import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IoAlertCircleOutline } from 'react-icons/io5';

interface Props {
  text: string;
  setIsModalOpen: Function;
}

const Modal = ({ text, setIsModalOpen }: Props) => {
  useEffect(() => {
    setTimeout(() => setIsModalOpen(false), 2000);
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className="modal-wrap">
        <div className="modal">
          <IoAlertCircleOutline />
          {text}
        </div>
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
};

export default Modal;
